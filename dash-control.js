const pcap = require('pcap2'),
	convertHex = require('convert-hex'),
	pcapSession = new pcap.Session('wlan0', {filter: 'ip proto \\tcp'});


pcapSession.on('packet', function(rawPacket) {
	const packet = pcap.decode.packet(rawPacket);	
	const bytes = packet.payload.dhost.addr;
	const MACAddress = convertHex.bytesToHex(bytes);
	console.log(MACAddress);
});