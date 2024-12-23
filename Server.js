
var dgram = require("dgram");

var server = dgram.createSocket("udp4");

var data;
var hosts = [];


const msgType = {

    CREATE_HOST : 0,
	JOIN_HOST : 1,
	STOP_HOST : 2,
    SET_PLAYER_STAT : 3,
    GET_HOSTS : 4,
    GET_PLAYER_STAT : 5,
    GET_NEW_PLAYERS : 6
}

function player(player_number, x, y, left_key, right_key, down_key, jump_key, crouch_key, run_key, xspd, yspd, on_ground, jump_count, my_floor_plat, move_plat_xspd, move_dir, jump_key_pressed, jump_key_buffer_timer, jump_key_buffered, jump_max, jspd0, jspd1, jump_hold_frames0, jump_hold_frames1, jump_hold_timer, coyote_hang_timer, coyote_hang_frames){
    this.left_key = left_key;
    this.right = right_key;
    this.down_key = down_key;
    this.jump_key = jump_key;
    this.crouch_key = crouch_key;
    this.run_key = run_key;
    this.xspd = xspd;
    this.yspd = yspd;
    this.on_ground = on_ground;
    this.jump_count = jump_count;
    this.my_floor_plat = my_floor_plat;
    this.move_plat_xspd = move_plat_xspd;
    this.move_dir = move_dir;
    this.jump_key_pressed = jump_key_pressed;
    this.jump_key_buffered = jump_key_buffered;
    this.jump_key_buffer_timer = jump_key_buffer_timer;
    this.jump_max = jump_max;
    this.jspd0 = jspd0;
    this.jspd1 = jspd1;
    this.jump_hold_frames0 = jump_hold_frames0;
    this.jump_hold_frames1 = jump_hold_frames1;
    this.jump_hold_timer = jump_hold_timer;
    this.coyote_hang_timer = coyote_hang_timer;
    this.coyote_hang_frames = coyote_hang_frames;
    this.x = x;
    this.y = y;
    this.player_number = player_number;
}

server.on("message", function(msg , rinfo) {
    console.log("< " + String(msg));
    data = JSON.parse(msg);

    switch (data.type) {

        case msgType.SET_PLAYER_STAT:
        set_player_stat(data, rinfo);
        break;

        case msgType.CREATE_HOST:
        create_host(data, rinfo);
        break;

        case msgType.STOP_HOST:
        stop_host(data, rinfo);
        break;

        case msgType.GET_HOSTS:
        get_host(data, rinfo);
        break;

        case msgType.JOIN_HOST:
        join_host(data, rinfo);
        break;

        case msgType.GET_PLAYER_STAT:
        get_player_stat(data, rinfo);
        break;

        case msgType.GET_NEW_PLAYERS:
        get_new_players(data, rinfo);
        break;

        default:
            break;
    }
});

function set_player_stat(data, rinfo){
    console.log("We are in set_player_stat function");
        hosts[data.hostnumber][data.playernumber].left_key = data.left_key;
        hosts[data.hostnumber][data.playernumber].right_key = data.right_key;
        hosts[data.hostnumber][data.playernumber].down_key = data.down_key;
        hosts[data.hostnumber][data.playernumber].jump_key = data.jump_key;
        hosts[data.hostnumber][data.playernumber].crouch_key = data.crouch_key;
        hosts[data.hostnumber][data.playernumber].run_key = data.run_key;
        hosts[data.hostnumber][data.playernumber].xspd = data.xspd;
        hosts[data.hostnumber][data.playernumber].yspd = data.yspd;
        hosts[data.hostnumber][data.playernumber].on_ground = data.on_ground;
        hosts[data.hostnumber][data.playernumber].jump_count = data.jump_count;
        hosts[data.hostnumber][data.playernumber].my_floor_plat = data.my_floor_plat;
        hosts[data.hostnumber][data.playernumber].move_plat_xspd = data.move_plat_xspd;
        hosts[data.hostnumber][data.playernumber].move_dir = data.move_dir;
        hosts[data.hostnumber][data.playernumber].jump_key_pressed = data.jump_key_pressed;
        hosts[data.hostnumber][data.playernumber].jump_key_buffered = data.jump_key_buffered;
        hosts[data.hostnumber][data.playernumber].jump_key_buffer_timer = data.jump_key_buffer_timer;
        hosts[data.hostnumber][data.playernumber].jump_count = data.jump_count;
        hosts[data.hostnumber][data.playernumber].jump_max = data.jump_max;
        hosts[data.hostnumber][data.playernumber].jspd0 = data.jspd0;
        hosts[data.hostnumber][data.playernumber].jspd1 = data.jspd1;
        hosts[data.hostnumber][data.playernumber].jump_hold_frames0 = data.jump_hold_frames0;
        hosts[data.hostnumber][data.playernumber].jump_hold_frames1 = data.jump_hold_frames1;
        hosts[data.hostnumber][data.playernumber].jump_hold_timer = data.jump_hold_timer;
        hosts[data.hostnumber][data.playernumber].coyote_hang_timer = data.coyote_hang_timer;
        hosts[data.hostnumber][data.playernumber].coyote_hang_frames = data.coyote_hang_frames;
        hosts[data.hostnumber][data.playernumber].x = data.x;
        hosts[data.hostnumber][data.playernumber].y = data.y;
    } 



function create_host(data, rinfo){
    console.log("We are in create_host function");
    var hostNumber = hosts.length;
    hosts.push([new player(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)]);

    data.hostNumber = hostNumber;
    data.playerNumber = 0;

    server.send(JSON.stringify(data), rinfo.port, rinfo.address);
    console.table(hosts);

}

function stop_host (data, rinfo){
    console.log("We are in stop_host function");
    var host_to_stop = hosts.indexOf(data.hostnumber);
    hosts.splice(host_to_stop, 1);
    data.res = "Stopped";
    server.send(JSON.stringify(data), rinfo.port, rinfo.address);
    console.table(hosts);
}

function get_host (data, rinfo){
    console.log("We are in get_host function");
    data.hosts = hosts;
    server.send(JSON.stringify(data), rinfo.port, rinfo.address);
}

function join_host(data, rinfo){
    console.log("We are in join_host function");
    var number_of_players = hosts[data.hostnumber].length;
    hosts[data.hostnumber].push(new player(number_of_players, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    data.playernumber = number_of_players;
    server.send(JSON.stringify(data), rinfo.port, rinfo.address);
    console.table(hosts);
}

function get_player_stat(data, rinfo){
    console.log("We are in get_player_stat function");
    data.playerstat = hosts[data.hostnumber][data.playernumber];
    server.send(JSON.stringify(data), rinfo.port, rinfo.address);
}

function get_new_players(data, rinfo){
    console.log("We are in get_new_players function");
    data.players = hosts[data.hostnumber];
    server.send(JSON.stringify(data), rinfo.port, rinfo.address);
}


server.bind(8080, "0.0.0.0");