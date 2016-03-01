var irobot = require('./index');

var robot = new irobot.Robot('/dev/ttyUSB0');

robot.on('ready', function() {
    console.log('READY');
});

// robot.on('sensordata', function (data) {
//   console.log('SENSOR DATA', data);
// });

var keypress = require('keypress');
velocity = { left: 0, right: 0 };
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function(ch, key) {
    console.log('got "keypress"', key);
    if (!key) return;

    if (key.name == 'w') {
        console.log("moved up");
        //up(10);
        velocity.left += 10;
        velocity.right += 10;
        robot.drive(velocity);
        //robot.rtsTrue();
    } else if (key.name == 's') {
        velocity.left -= 10;
        velocity.right -= 10;
        robot.drive(velocity);
        //robot.rtsFalse();
    } else if (key.name == 'd') {
        velocity.left -= 5;
        velocity.right += 5;
        robot.drive(velocity);
        console.log("moved right");
        //turnRightDegrees(10);
    } else if (key.name == 'a') {
        velocity.left += 5;
        velocity.right -= 5;
        robot.drive(velocity);
        console.log("moved left");
        //turnLeftDegrees(10);
    } else if (key.name == 'space') {
        console.log("stop me");
        velocity.left = 0;
        velocity.right = 0;
        robot.drive(velocity);
    } else if (key.name == 'f') {
        console.log("fullMode");
        robot.fullMode();
    } else if (key.name == 'p') {
        console.log("passiveMode");
        robot.passiveMode();
    } else if (key.name == 'g') {
        console.log("go -- safeMode");
        robot.safeMode();
    } else if (key.name == 'q') {
        console.log("play song");
        mysong = [
            [578*pitch, 100*tempo],
            [246*pitch, 100*tempo],
            [129*pitch, 100*tempo],
            [789*pitch, 100*tempo],
            [980*pitch, 167*tempo],
            [676*pitch, 100*tempo],
            [123*pitch, 100*tempo],
            [456*pitch, 100*tempo],
            [789*pitch, 100*tempo],
            [436*pitch, 100*tempo],
            [321*pitch, 100*tempo],
            [876*pitch, 100*tempo],
            [654*pitch, 100*tempo],
            [584*pitch, 100*tempo],
            [785*pitch, 100*tempo],
            [231*pitch, 100*tempo],
            [641*pitch, 100*tempo],
            [513*pitch, 100*tempo],
            [715*pitch, 100*tempo],
            [111*pitch, 100*tempo],
            [735*pitch, 100*tempo],
            [876*pitch, 100*tempo],
            [761*pitch, 100*tempo],
            [612*pitch, 100*tempo],
            [412*pitch, 100*tempo],
            [876*pitch, 100*tempo],
            [142*pitch, 100*tempo],
            [762*pitch, 100*tempo],
            [214*pitch, 100*tempo],
            [124*pitch, 100*tempo],
            [765*pitch, 100*tempo],
            [145*pitch, 100*tempo],
            [126*pitch, 100*tempo]
        ];
        robot.sing(mysong);
    }


    if (key && key.ctrl && key.name == 'c') {
        console.log('shift control.c');
        process.exit();
        //process.stdin.pause();
    }
});


process.stdin.setRawMode(true);

process.stdin.resume();
batteryVolts = 0;
robot.on('sensordata', function(data) {
    if (batteryVolts !== data.battery.voltage.volts) {
        batteryVolts = data.battery.voltage.volts;
        console.log('voltage', batteryVolts);
    }
});
robot.on('bump', function(e) {
    console.log('BUMP', e);
});
robot.on('button', function(e) {
    console.log('BUTTON', e);
});
robot.on('cliff', function(e) {
    console.log('CLIFF', e);
});
robot.on('ir', function(e) {
    console.log('IR', e);
});
robot.on('mode', function(e) {
    console.log('MODE', e);
});
robot.on('overcurrent', function(e) {
    console.log('OVERCURRENT', e);
});
robot.on('virtualwall', function(e) {
    console.log('VIRTUALWALL', e);
});
robot.on('wall', function(e) {
    console.log('WALL', e);
});
robot.on('wheeldrop', function(e) {
    console.log('WHEELDROP', e);
});
