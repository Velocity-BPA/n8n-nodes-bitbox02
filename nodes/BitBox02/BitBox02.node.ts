/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-bitbox02/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class BitBox02 implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'BitBox02',
    name: 'bitbox02',
    icon: 'file:bitbox02.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the BitBox02 API',
    defaults: {
      name: 'BitBox02',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'bitbox02Api',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Device',
            value: 'device',
          },
          {
            name: 'Account',
            value: 'account',
          },
          {
            name: 'Transaction',
            value: 'transaction',
          },
          {
            name: 'Address',
            value: 'address',
          },
          {
            name: 'Backup',
            value: 'backup',
          },
          {
            name: 'Settings',
            value: 'settings',
          }
        ],
        default: 'device',
      },
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['device'] } },
  options: [
    { name: 'List Devices', value: 'listDevices', description: 'Get list of connected BitBox02 devices', action: 'List connected devices' },
    { name: 'Pair Device', value: 'pairDevice', description: 'Pair with a specific device', action: 'Pair device' },
    { name: 'Get Device Info', value: 'getDeviceInfo', description: 'Get device information and status', action: 'Get device information' },
    { name: 'Unlock Device', value: 'unlockDevice', description: 'Unlock device with password', action: 'Unlock device' },
    { name: 'Lock Device', value: 'lockDevice', description: 'Lock the device', action: 'Lock device' },
    { name: 'Get Device Status', value: 'getDeviceStatus', description: 'Get current device status', action: 'Get device status' }
  ],
  default: 'listDevices',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['account'] } },
	options: [
		{
			name: 'Get All Accounts',
			value: 'getAccounts',
			description: 'Get all accounts on device',
			action: 'Get all accounts on device'
		},
		{
			name: 'Create Account',
			value: 'createAccount',
			description: 'Create new account',
			action: 'Create a new account'
		},
		{
			name: 'Get Account',
			value: 'getAccount',
			description: 'Get specific account details',
			action: 'Get account details'
		},
		{
			name: 'Update Account',
			value: 'updateAccount',
			description: 'Update account settings',
			action: 'Update account settings'
		},
		{
			name: 'Delete Account',
			value: 'deleteAccount',
			description: 'Remove account',
			action: 'Delete an account'
		},
		{
			name: 'Get Account Balance',
			value: 'getAccountBalance',
			description: 'Get account balance',
			action: 'Get account balance'
		}
	],
	default: 'getAccounts'
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['transaction'],
		},
	},
	options: [
		{
			name: 'Get Transactions',
			value: 'getTransactions',
			description: 'Get transaction history for an account',
			action: 'Get transactions',
		},
		{
			name: 'Create Transaction',
			value: 'createTransaction',
			description: 'Create a new transaction',
			action: 'Create transaction',
		},
		{
			name: 'Get Transaction',
			value: 'getTransaction',
			description: 'Get specific transaction details',
			action: 'Get transaction',
		},
		{
			name: 'Sign Transaction',
			value: 'signTransaction',
			description: 'Sign transaction with device',
			action: 'Sign transaction',
		},
		{
			name: 'Broadcast Transaction',
			value: 'broadcastTransaction',
			description: 'Broadcast signed transaction',
			action: 'Broadcast transaction',
		},
		{
			name: 'Verify Transaction',
			value: 'verifyTransaction',
			description: 'Verify transaction details',
			action: 'Verify transaction',
		},
	],
	default: 'getTransactions',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['address'],
		},
	},
	options: [
		{
			name: 'Get Addresses',
			value: 'getAddresses',
			description: 'Get all addresses for account',
			action: 'Get all addresses for account',
		},
		{
			name: 'Generate Address',
			value: 'generateAddress',
			description: 'Generate new receiving address',
			action: 'Generate new receiving address',
		},
		{
			name: 'Get Address',
			value: 'getAddress',
			description: 'Get specific address details',
			action: 'Get specific address details',
		},
		{
			name: 'Verify Address',
			value: 'verifyAddress',
			description: 'Verify address on device screen',
			action: 'Verify address on device screen',
		},
		{
			name: 'Get Unused Addresses',
			value: 'getUnusedAddresses',
			description: 'Get unused addresses',
			action: 'Get unused addresses',
		},
	],
	default: 'getAddresses',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['backup'] } },
  options: [
    { name: 'Get Backup Status', value: 'getBackupStatus', description: 'Get backup status', action: 'Get backup status' },
    { name: 'Create Backup', value: 'createBackup', description: 'Create device backup', action: 'Create backup' },
    { name: 'Verify Backup', value: 'verifyBackup', description: 'Verify backup words', action: 'Verify backup' },
    { name: 'Restore Backup', value: 'restoreBackup', description: 'Restore from backup', action: 'Restore backup' },
    { name: 'Get Backup Words', value: 'getBackupWords', description: 'Get backup words for verification', action: 'Get backup words' }
  ],
  default: 'getBackupStatus',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['settings'],
		},
	},
	options: [
		{
			name: 'Get Settings',
			value: 'getSettings',
			description: 'Get all device settings',
			action: 'Get device settings',
		},
		{
			name: 'Update Settings',
			value: 'updateSettings',
			description: 'Update device settings',
			action: 'Update device settings',
		},
		{
			name: 'Get Password Status',
			value: 'getPasswordStatus',
			description: 'Check if device password is set',
			action: 'Get password status',
		},
		{
			name: 'Set Password',
			value: 'setPassword',
			description: 'Set device password',
			action: 'Set device password',
		},
		{
			name: 'Change Password',
			value: 'changePassword',
			description: 'Change device password',
			action: 'Change device password',
		},
		{
			name: 'Remove Password',
			value: 'removePassword',
			description: 'Remove device password',
			action: 'Remove device password',
		},
	],
	default: 'getSettings',
},
{
  displayName: 'Device ID',
  name: 'deviceID',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['device'], operation: ['pairDevice', 'getDeviceInfo', 'unlockDevice', 'lockDevice', 'getDeviceStatus'] } },
  default: '',
  description: 'The unique identifier of the BitBox02 device',
},
{
  displayName: 'Pairing Code',
  name: 'pairingCode',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['device'], operation: ['pairDevice'] } },
  default: '',
  description: 'The pairing code displayed on the device screen',
},
{
  displayName: 'Password',
  name: 'password',
  type: 'string',
  typeOptions: { password: true },
  required: true,
  displayOptions: { show: { resource: ['device'], operation: ['unlockDevice'] } },
  default: '',
  description: 'The device password for unlocking',
},
{
	displayName: 'Device ID',
	name: 'deviceID',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccounts', 'createAccount', 'getAccount', 'updateAccount', 'deleteAccount', 'getAccountBalance']
		}
	},
	default: '',
	placeholder: 'Enter device ID',
	description: 'The ID of the BitBox02 device'
},
{
	displayName: 'Coin Type',
	name: 'coinType',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccounts', 'createAccount']
		}
	},
	options: [
		{
			name: 'Bitcoin',
			value: 'btc'
		},
		{
			name: 'Litecoin',
			value: 'ltc'
		},
		{
			name: 'Ethereum',
			value: 'eth'
		}
	],
	default: 'btc',
	description: 'The cryptocurrency type for the account'
},
{
	displayName: 'Account Type',
	name: 'accountType',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['createAccount']
		}
	},
	options: [
		{
			name: 'Unified',
			value: 'unified'
		},
		{
			name: 'Legacy',
			value: 'legacy'
		},
		{
			name: 'Segwit',
			value: 'segwit'
		}
	],
	default: 'unified',
	description: 'The type of account to create'
},
{
	displayName: 'Account Code',
	name: 'accountCode',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['getAccount', 'updateAccount', 'deleteAccount', 'getAccountBalance']
		}
	},
	default: '',
	placeholder: 'Enter account code',
	description: 'The unique code for the account'
},
{
	displayName: 'Account Name',
	name: 'name',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['account'],
			operation: ['updateAccount']
		}
	},
	default: '',
	placeholder: 'Enter account name',
	description: 'The new name for the account'
},
{
	displayName: 'Device ID',
	name: 'deviceID',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['transaction'],
			operation: ['getTransactions', 'createTransaction', 'getTransaction', 'signTransaction', 'broadcastTransaction', 'verifyTransaction'],
		},
	},
	default: '',
	description: 'The unique identifier of the BitBox02 device',
},
{
	displayName: 'Account Code',
	name: 'accountCode',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['transaction'],
			operation: ['getTransactions', 'createTransaction', 'signTransaction'],
		},
	},
	default: '',
	description: 'The account code for the transaction',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['transaction'],
			operation: ['getTransactions'],
		},
	},
	default: 50,
	description: 'Maximum number of transactions to return',
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['transaction'],
			operation: ['getTransactions'],
		},
	},
	default: 0,
	description: 'Number of transactions to skip',
},
{
	displayName: 'Recipients',
	name: 'recipients',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	displayOptions: {
		show: {
			resource: ['transaction'],
			operation: ['createTransaction'],
		},
	},
	default: {},
	options: [
		{
			name: 'recipient',
			displayName: 'Recipient',
			values: [
				{
					displayName: 'Address',
					name: 'address',
					type: 'string',
					default: '',
					description: 'Recipient address',
				},
				{
					displayName: 'Amount',
					name: 'amount',
					type: 'string',
					default: '',
					description: 'Amount to send',
				},
			],
		},
	],
},
{
	displayName: 'Amount',
	name: 'amount',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['transaction'],
			operation: ['createTransaction'],
		},
	},
	default: '',
	description: 'Total amount to send',
},
{
	displayName: 'Fee Rate',
	name: 'feeRate',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['transaction'],
			operation: ['createTransaction'],
		},
	},
	default: 1,
	description: 'Transaction fee rate in satoshis per byte',
},
{
	displayName: 'Transaction Hash',
	name: 'txHash',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['transaction'],
			operation: ['getTransaction'],
		},
	},
	default: '',
	description: 'The hash of the transaction to retrieve',
},
{
	displayName: 'Transaction',
	name: 'transaction',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['transaction'],
			operation: ['signTransaction', 'verifyTransaction'],
		},
	},
	default: '{}',
	description: 'The transaction object to sign or verify',
},
{
	displayName: 'Signed Transaction',
	name: 'signedTransaction',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['transaction'],
			operation: ['broadcastTransaction'],
		},
	},
	default: '{}',
	description: 'The signed transaction to broadcast',
},
{
	displayName: 'Device ID',
	name: 'deviceID',
	type: 'string',
	required: true,
	default: '',
	description: 'The BitBox02 device identifier',
	displayOptions: {
		show: {
			resource: ['address'],
			operation: ['getAddresses', 'generateAddress', 'getAddress', 'verifyAddress', 'getUnusedAddresses'],
		},
	},
},
{
	displayName: 'Account Code',
	name: 'accountCode',
	type: 'string',
	required: true,
	default: '',
	description: 'The account code to query addresses for',
	displayOptions: {
		show: {
			resource: ['address'],
			operation: ['getAddresses', 'generateAddress', 'getAddress', 'verifyAddress', 'getUnusedAddresses'],
		},
	},
},
{
	displayName: 'Address',
	name: 'address',
	type: 'string',
	required: true,
	default: '',
	description: 'The specific address to query or verify',
	displayOptions: {
		show: {
			resource: ['address'],
			operation: ['getAddress', 'verifyAddress'],
		},
	},
},
{
	displayName: 'Include Unused',
	name: 'unused',
	type: 'boolean',
	default: false,
	description: 'Whether to include unused addresses in the results',
	displayOptions: {
		show: {
			resource: ['address'],
			operation: ['getAddresses'],
		},
	},
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 10,
	description: 'Maximum number of unused addresses to return',
	displayOptions: {
		show: {
			resource: ['address'],
			operation: ['getUnusedAddresses'],
		},
	},
},
{
  displayName: 'Device ID',
  name: 'deviceID',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['backup'],
      operation: ['getBackupStatus', 'createBackup', 'verifyBackup', 'restoreBackup', 'getBackupWords']
    }
  },
  default: '',
  description: 'The ID of the BitBox02 device'
},
{
  displayName: 'Mnemonic Words',
  name: 'mnemonicWords',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['backup'],
      operation: ['restoreBackup']
    }
  },
  default: '',
  description: 'The mnemonic words for backup restoration'
},
{
	displayName: 'Device ID',
	name: 'deviceId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['settings'],
			operation: ['getSettings', 'updateSettings', 'getPasswordStatus', 'setPassword', 'changePassword', 'removePassword'],
		},
	},
	default: '',
	placeholder: 'Enter device ID',
	description: 'The ID of the BitBox02 device',
},
{
	displayName: 'Settings',
	name: 'settings',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['settings'],
			operation: ['updateSettings'],
		},
	},
	default: '{}',
	placeholder: '{"autoLock": true, "sleepMode": false}',
	description: 'Device settings to update as JSON object',
},
{
	displayName: 'Password',
	name: 'password',
	type: 'string',
	typeOptions: {
		password: true,
	},
	required: true,
	displayOptions: {
		show: {
			resource: ['settings'],
			operation: ['setPassword', 'removePassword'],
		},
	},
	default: '',
	placeholder: 'Enter password',
	description: 'Device password',
},
{
	displayName: 'Current Password',
	name: 'currentPassword',
	type: 'string',
	typeOptions: {
		password: true,
	},
	required: true,
	displayOptions: {
		show: {
			resource: ['settings'],
			operation: ['changePassword'],
		},
	},
	default: '',
	placeholder: 'Enter current password',
	description: 'Current device password',
},
{
	displayName: 'New Password',
	name: 'newPassword',
	type: 'string',
	typeOptions: {
		password: true,
	},
	required: true,
	displayOptions: {
		show: {
			resource: ['settings'],
			operation: ['changePassword'],
		},
	},
	default: '',
	placeholder: 'Enter new password',
	description: 'New device password',
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'device':
        return [await executeDeviceOperations.call(this, items)];
      case 'account':
        return [await executeAccountOperations.call(this, items)];
      case 'transaction':
        return [await executeTransactionOperations.call(this, items)];
      case 'address':
        return [await executeAddressOperations.call(this, items)];
      case 'backup':
        return [await executeBackupOperations.call(this, items)];
      case 'settings':
        return [await executeSettingsOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeDeviceOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('bitbox02Api') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'listDevices': {
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/devices`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'pairDevice': {
          const deviceID = this.getNodeParameter('deviceID', i) as string;
          const pairingCode = this.getNodeParameter('pairingCode', i) as string;
          
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/devices/${deviceID}/pair`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              pairingCode,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getDeviceInfo': {
          const deviceID = this.getNodeParameter('deviceID', i) as string;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/devices/${deviceID}/info`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'unlockDevice': {
          const deviceID = this.getNodeParameter('deviceID', i) as string;
          const password = this.getNodeParameter('password', i) as string;
          
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/devices/${deviceID}/unlock`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              password,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'lockDevice': {
          const deviceID = this.getNodeParameter('deviceID', i) as string;
          
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/devices/${deviceID}/lock`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getDeviceStatus': {
          const deviceID = this.getNodeParameter('deviceID', i) as string;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/devices/${deviceID}/status`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeAccountOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('bitbox02Api') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getAccounts': {
					const deviceID = this.getNodeParameter('deviceID', i) as string;
					const coinType = this.getNodeParameter('coinType', i) as string;
					
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/devices/${deviceID}/accounts`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						qs: {
							coinType: coinType
						},
						json: true
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createAccount': {
					const deviceID = this.getNodeParameter('deviceID', i) as string;
					const coinType = this.getNodeParameter('coinType', i) as string;
					const accountType = this.getNodeParameter('accountType', i) as string;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/devices/${deviceID}/accounts`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							coinType: coinType,
							accountType: accountType
						},
						json: true
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getAccount': {
					const deviceID = this.getNodeParameter('deviceID', i) as string;
					const accountCode = this.getNodeParameter('accountCode', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/devices/${deviceID}/accounts/${accountCode}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateAccount': {
					const deviceID = this.getNodeParameter('deviceID', i) as string;
					const accountCode = this.getNodeParameter('accountCode', i) as string;
					const name = this.getNodeParameter('name', i) as string;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/devices/${deviceID}/accounts/${accountCode}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							name: name
						},
						json: true
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deleteAccount': {
					const deviceID = this.getNodeParameter('deviceID', i) as string;
					const accountCode = this.getNodeParameter('accountCode', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/devices/${deviceID}/accounts/${accountCode}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getAccountBalance': {
					const deviceID = this.getNodeParameter('deviceID', i) as string;
					const accountCode = this.getNodeParameter('accountCode', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/devices/${deviceID}/accounts/${accountCode}/balance`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i }
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i }
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeTransactionOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('bitbox02Api') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getTransactions': {
					const deviceID = this.getNodeParameter('deviceID', i) as string;
					const accountCode = this.getNodeParameter('accountCode', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/devices/${deviceID}/accounts/${accountCode}/transactions`,
						qs: {
							limit,
							offset,
						},
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createTransaction': {
					const deviceID = this.getNodeParameter('deviceID', i) as string;
					const accountCode = this.getNodeParameter('accountCode', i) as string;
					const recipients = this.getNodeParameter('recipients', i) as any;
					const amount = this.getNodeParameter('amount', i) as string;
					const feeRate = this.getNodeParameter('feeRate', i) as number;

					const body: any = {
						recipients: recipients.recipient || [],
						amount,
						feeRate,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/devices/${deviceID}/accounts/${accountCode}/transactions`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getTransaction': {
					const deviceID = this.getNodeParameter('deviceID', i) as string;
					const txHash = this.getNodeParameter('txHash', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/devices/${deviceID}/transactions/${txHash}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'signTransaction': {
					const deviceID = this.getNodeParameter('deviceID', i) as string;
					const transaction = this.getNodeParameter('transaction', i) as any;
					const accountCode = this.getNodeParameter('accountCode', i) as string;

					const body: any = {
						transaction: typeof transaction === 'string' ? JSON.parse(transaction) : transaction,
						accountCode,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/devices/${deviceID}/transactions/sign`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'broadcastTransaction': {
					const deviceID = this.getNodeParameter('deviceID', i) as string;
					const signedTransaction = this.getNodeParameter('signedTransaction', i) as any;

					const body: any = {
						signedTransaction: typeof signedTransaction === 'string' ? JSON.parse(signedTransaction) : signedTransaction,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/devices/${deviceID}/transactions/broadcast`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'verifyTransaction': {
					const deviceID = this.getNodeParameter('deviceID', i) as string;
					const transaction = this.getNodeParameter('transaction', i) as any;

					const body: any = {
						transaction: typeof transaction === 'string' ? JSON.parse(transaction) : transaction,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/devices/${deviceID}/transactions/verify`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeAddressOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('bitbox02Api') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;
			const deviceID = this.getNodeParameter('deviceID', i) as string;
			const accountCode = this.getNodeParameter('accountCode', i) as string;

			switch (operation) {
				case 'getAddresses': {
					const unused = this.getNodeParameter('unused', i) as boolean;
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/devices/${deviceID}/accounts/${accountCode}/addresses`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						qs: {
							unused: unused,
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}
				case 'generateAddress': {
					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/devices/${deviceID}/accounts/${accountCode}/addresses`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}
				case 'getAddress': {
					const address = this.getNodeParameter('address', i) as string;
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/devices/${deviceID}/accounts/${accountCode}/addresses/${address}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}
				case 'verifyAddress': {
					const address = this.getNodeParameter('address', i) as string;
					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/devices/${deviceID}/addresses/verify`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							address: address,
							accountCode: accountCode,
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}
				case 'getUnusedAddresses': {
					const limit = this.getNodeParameter('limit', i) as number;
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/devices/${deviceID}/accounts/${accountCode}/addresses/unused`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						qs: {
							limit: limit,
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}
				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`, {
						itemIndex: i,
					});
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeBackupOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('bitbox02Api') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const deviceID = this.getNodeParameter('deviceID', i) as string;

      switch (operation) {
        case 'getBackupStatus': {
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/devices/${deviceID}/backup/status`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json'
            },
            json: true
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'createBackup': {
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/devices/${deviceID}/backup/create`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json'
            },
            json: true
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'verifyBackup': {
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/devices/${deviceID}/backup/verify`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json'
            },
            json: true
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'restoreBackup': {
          const mnemonicWords = this.getNodeParameter('mnemonicWords', i) as string;
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/devices/${deviceID}/backup/restore`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json'
            },
            body: {
              mnemonicWords: mnemonicWords
            },
            json: true
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getBackupWords': {
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/devices/${deviceID}/backup/words`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json'
            },
            json: true
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i }
      });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i }
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeSettingsOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('bitbox02Api') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			const deviceId = this.getNodeParameter('deviceId', i) as string;
			let result: any;

			switch (operation) {
				case 'getSettings': {
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/devices/${deviceId}/settings`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateSettings': {
					const settings = this.getNodeParameter('settings', i) as string;
					const settingsObject = typeof settings === 'string' ? JSON.parse(settings) : settings;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/devices/${deviceId}/settings`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: settingsObject,
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getPasswordStatus': {
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/devices/${deviceId}/settings/password`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'setPassword': {
					const password = this.getNodeParameter('password', i) as string;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/devices/${deviceId}/settings/password`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							password: password,
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'changePassword': {
					const currentPassword = this.getNodeParameter('currentPassword', i) as string;
					const newPassword = this.getNodeParameter('newPassword', i) as string;

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/devices/${deviceId}/settings/password`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							currentPassword: currentPassword,
							newPassword: newPassword,
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'removePassword': {
					const password = this.getNodeParameter('password', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/devices/${deviceId}/settings/password`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							password: password,
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(
						this.getNode(),
						`Unknown operation: ${operation}`,
						{ itemIndex: i },
					);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}
