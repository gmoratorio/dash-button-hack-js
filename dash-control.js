// const pcap = require('pcap2'),
//     convertHex = require('convert-hex'),
//
//
// let pcapSession = null;
//

//

//
//
// pcapSession.on('packet', function (rawPacket) {
//     const packet = pcap.decode.packet(rawPacket);
//
//
//     if(packet.payload && packet.payload.payload && packet.payload.payload.constructor.name === "Arp") {
//         const ipAddressArray = packet.payload.payload.sender_pa.addr;
//         const MACBytes = packet.payload.payload.sender_ha.addr;
//         const ipAddress = ipAddressArray.join('.');
//         const MACAddress = convertHex.bytesToHex(MACBytes);
//
//         const isANewMACAddress = !!_.find(MACIgnoreArray, MACAddress);
//         const isANewIPAddress = !!_.find(ipIgnoreArray, ipAddress);
//
//
//         if (isANewMACAddress) {
//             console.log(MACAddress);
//         }
//
//         if (isANewIPAddress) {
//             console.log(ipAddress);
//         }
//     }
//
//
//
// });

// var arp = require('node-arp');
//
// arp.getMAC('192.168.0.88', function(err, mac) {
//     if (!err) {
//         console.log(mac);
//     }
// });


const arpListener = require('arp-listener'),
    _ = require('lodash');


const os = process.platform;


let interface = null;

switch (os) {
    case 'darwin':
    case 'freebsd':
        interface = 'en0';
        break;

    case 'linux':
        interface = 'wlan0';
        break;

    default:
        interface = 'wlan0';
        break;
}

console.log(interface);
arpListener('wlan0', function (arpData) {


    let MACIgnoreArray = [
        '18:65:90:dc:a6:99',
        '64:a5:c3:61:7e:8e',
        '38:01:95:12:0c:0a',
        '14:49:e0:04:90:4b',
        'a0:a3:e2:30:fd:50',
        '08:66:98:c8:44:38',
        '98:b6:e9:05:46:dc',
        '60:5b:b4:07:ff:89',
        'dc:ef:ca:56:5a:2d',
        'b8:27:eb:fb:d2:27',
        '44:65:0d:44:61:8c',
        '8c:2d:aa:37:fb:d3',
        '00:17:88:2f:6a:d8'
    ];

    const thisMAC = arpData.sender_ha;
    console.log(thisMAC);
    const isANewMACAddress = !_.includes(MACIgnoreArray, thisMAC);

    if (isANewMACAddress) {
        console.log(thisMAC);
    }


    // let ipIgnoreArray = ['192.168.0.88', '192.168.0.108'];
    // const ipAddress = arpData.sender_pa.addr.join('.');
    // const isANewIPAddress = !_.includes(ipIgnoreArray, ipAddress);
    // if (isANewIPAddress) {
    //     console.log(ipAddress);
    // }


})

