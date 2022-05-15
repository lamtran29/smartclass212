import serial.tools.list_ports
import datetime
import time
import sys
from Adafruit_IO import MQTTClient, Client
import threading

AIO_FEED_IDS = ["da-light-sensor", "da-temp", "da-infrared", "da-speaker", "da-classlight",
                "da-door", "da-fan", "da-hallway-light", "da-auto"]

AIO_USERNAME = "dang_416"
AIO_KEY = "aio_XaNP69UsDH0JTfthnAEBmo72FeLE"

mess = ""

oldInfrared = 0
currInfrared = 0
dataChangeTime = datetime.datetime.now()

light_data = 0
temp_data = 0
auto = 0

warning = 0


def room_state():
    global fanState, lightState, doorState, roomState
    roomState = fanState or lightState or doorState
    return roomState


isMicrobitConnected = True


def fan_level(temp):
    if temp > 32:
        return "3"
    if temp > 28:
        return "2"
    return "1"


def ctrl_auto():
    global dataChangeTime, light_data
    while True:
        if auto:
            old = oldInfrared
            new = currInfrared

            print("old status:", old, "\nnew status:", new)
            if old and not new:
                print("People just left the room")
                dataChangeTime = datetime.datetime.now()
                print("time change:", dataChangeTime)

            elif old and new:
                set_up_room(1, light_data > 100)
                print("People still in the room")

            elif not old and new:
                print("Someone enter the room")
                set_up_room(1, light_data > 100)

            elif not old and not new:
                print("The room is still empty")
                waiting_time = (datetime.datetime.now() - dataChangeTime).total_seconds()
                print("time wait", waiting_time, "s")
                if waiting_time > 30:
                    if room_state():
                        set_up_room(0, 0)
            else:
                pass

        time.sleep(10)


def set_up_room(state, light):
    print("people", state, "light", light)
    global temp_data, doorState, fanState, lightState
    print("setup room state", state, "light", light)
    if state == 0:
        # ser.write(("da-door:0#").encode())
        print("da-door:0#")
        client.publish("da-door", 0)
        doorState = 0

        # ser.write(("da-fan:0#").encode())
        print("da-fan:0#")
        client.publish("da-fan", 0)
        fanState = 0

        # ser.write(("da-classlight:0#").encode())
        client.publish("da-classlight", 0)
        print("da-classlight:0#")
        lightState = 0
    else:
        ser.write(("da-door:1#").encode())
        print("da-door:1#")
        client.publish("da-door", 1)
        doorState = 1

        # new_fan_state = fan_level(temp_data)
        # ser.write(("da-fan" + ":" + fan_level(temp_data) + "#").encode())
        print("da-fan" + ":" + fan_level(temp_data) + "#")
        client.publish("da-fan", fan_level(temp_data))

        if not light:
            if lightState == 1: print("Light not change")
            # ser.write(("da-classlight:1#").encode())
            client.publish("da-classlight", 1)
            print("da-classlight:1#")

        else:
            if lightState == 0: print("Light not change")
            # ser.write(("da-classlight:0#").encode())
            client.publish("da-classlight", 0)
            print("da-classlight:0#")

    time.sleep(2)


def connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_IDS:
        client.subscribe(feed)


def subscribe(client, userdata, mid, granted_qos):
    print("Subcribe thanh cong...")


def disconnected(client):
    print("Ngat ket noi...")
    sys.exit(1)


def message(client, feed_id, payload):
    global auto, fanState, doorState, lightState, buzzerState, dataChangeTime
    # print("Nhan du lieu: " + feed_id, payload)
    if isMicrobitConnected:
        # print(str(feed_id) + ":" + str(payload) + "#")
        ser.write((str(feed_id) + ":" + str(payload) + "#").encode())
        if feed_id == "da-auto":
            if auto != int(payload): dataChangeTime = datetime.datetime.now()
            auto = int(payload)
        if feed_id == "da-fan":
            fanState = int(payload)
        if feed_id == "da-door":
            doorState = int(payload)
        if feed_id == "da-classlight":
            lightState = int(payload)
        if feed_id == "da-temp":
            global warning
            temp = int(payload)
            if temp > 50:
                print("ua")
                if not warning:
                    # print("da-warning:1#")
                    ser.write(("da-warning:1#").encode())
                    # print("da-warning:1#")
                    warning = 1
            if temp_data < 40:
                if warning:
                    warning = 0
                    # print("da-warning:0#")
                    ser.write(("da-warning:0#").encode())
                    # print("da-warning:0#")


client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()


def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        if "USB Serial Device" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
    return commPort


def processData(data):
    global oldInfrared, currInfrared, light_data, temp_data, fanState, lightState, doorState, warning

    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)

    try:
        if splitData[1] == "TEMP":
            if splitData[2]:
                client.publish("da-temp", splitData[2])
                temp_data = int(splitData[2])

        elif splitData[1] == "LIGHT":
            if splitData[2]:
                light_data = int(splitData[2])
                client.publish("da-light-sensor", splitData[2])

        elif splitData[1] == "INFRARED":
            if splitData[2]:
                oldInfrared = int(currInfrared)
                currInfrared = int(splitData[2])
                client.publish("da-infrared", splitData[2])

        elif splitData[1] == "SETUP":
            client.publish("da-classlight", 0)
            time.sleep(2)

            client.publish("da-fan", 0)
            time.sleep(2)

            client.publish("da-door", 0)
            time.sleep(2)

        elif splitData[1] == "HUMID":
            client.publish("da-humid", splitData[2])

        else:
            print("Invalid data. This data will be ignored\n")
    except:
        print("Invalid data. This data will be ignored\n")


def readSerial():
    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            processData(mess[start:end + 1])
            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end + 1:]


auto_thread = threading.Thread(target=ctrl_auto, args=())
auto_thread.start()

if getPort() != "None":
    ser = serial.Serial(port=getPort(), baudrate=115200)
    isMicrobitConnected = True

# ser = serial.Serial(port="COM2", baudrate=115200)
# isMicrobitConnected = True

aio = Client(AIO_USERNAME, AIO_KEY)
fanState = aio.data("da-fan")[0].value
lightState = aio.data("da-classlight")[0].value
doorState = aio.data("da-door")[0].value

client.publish("da-auto", 0)

while True:
    if isMicrobitConnected:
        readSerial()
    time.sleep(2)

auto_thread.join()
