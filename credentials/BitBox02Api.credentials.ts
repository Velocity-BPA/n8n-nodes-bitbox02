import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BitBox02Api implements ICredentialType {
	name = 'bitBox02Api';
	displayName = 'BitBox02 API';
	properties: INodeProperties[] = [
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.shiftcrypto.ch/v1',
			placeholder: 'https://api.shiftcrypto.ch/v1',
			description: 'The base URL for BitBox02 API endpoints',
		},
		{
			displayName: 'Device ID',
			name: 'deviceId',
			type: 'string',
			default: '',
			placeholder: 'device-12345',
			description: 'Your BitBox02 device identifier',
		},
		{
			displayName: 'Pairing Code',
			name: 'pairingCode',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			placeholder: 'Enter pairing code from device',
			description: 'Pairing code displayed on your BitBox02 device',
		},
		{
			displayName: 'Bridge URL',
			name: 'bridgeUrl',
			type: 'string',
			default: 'http://localhost:8178',
			placeholder: 'http://localhost:8178',
			description: 'URL of the BitBoxBridge software (typically runs locally)',
		},
	];
}