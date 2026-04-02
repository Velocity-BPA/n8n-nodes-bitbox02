/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { BitBox02 } from '../nodes/BitBox02/BitBox02.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('BitBox02 Node', () => {
  let node: BitBox02;

  beforeAll(() => {
    node = new BitBox02();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('BitBox02');
      expect(node.description.name).toBe('bitbox02');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 6 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(6);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(6);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('Device Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-key', 
        baseUrl: 'https://api.shiftcrypto.ch/v1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { httpRequest: jest.fn(), requestWithAuthentication: jest.fn() },
    };
  });

  describe('listDevices operation', () => {
    it('should successfully list connected devices', async () => {
      const mockDevices = { devices: [{ id: 'device1', name: 'BitBox02' }] };
      mockExecuteFunctions.getNodeParameter.mockReturnValue('listDevices');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockDevices);

      const result = await executeDeviceOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockDevices, pairedItem: { item: 0 } }]);
    });

    it('should handle listDevices error', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValue('listDevices');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Connection failed'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const result = await executeDeviceOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: { error: 'Connection failed' }, pairedItem: { item: 0 } }]);
    });
  });

  describe('pairDevice operation', () => {
    it('should successfully pair device', async () => {
      const mockPairResult = { success: true, paired: true };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('pairDevice')
        .mockReturnValueOnce('device123')
        .mockReturnValueOnce('1234');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockPairResult);

      const result = await executeDeviceOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockPairResult, pairedItem: { item: 0 } }]);
    });
  });

  describe('getDeviceInfo operation', () => {
    it('should successfully get device info', async () => {
      const mockDeviceInfo = { id: 'device123', version: '9.10.0', initialized: true };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getDeviceInfo')
        .mockReturnValueOnce('device123');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockDeviceInfo);

      const result = await executeDeviceOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockDeviceInfo, pairedItem: { item: 0 } }]);
    });
  });

  describe('unlockDevice operation', () => {
    it('should successfully unlock device', async () => {
      const mockUnlockResult = { success: true, unlocked: true };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('unlockDevice')
        .mockReturnValueOnce('device123')
        .mockReturnValueOnce('password123');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockUnlockResult);

      const result = await executeDeviceOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockUnlockResult, pairedItem: { item: 0 } }]);
    });
  });

  describe('lockDevice operation', () => {
    it('should successfully lock device', async () => {
      const mockLockResult = { success: true, locked: true };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('lockDevice')
        .mockReturnValueOnce('device123');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockLockResult);

      const result = await executeDeviceOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockLockResult, pairedItem: { item: 0 } }]);
    });
  });

  describe('getDeviceStatus operation', () => {
    it('should successfully get device status', async () => {
      const mockStatus = { status: 'unlocked', connected: true };
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getDeviceStatus')
        .mockReturnValueOnce('device123');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockStatus);

      const result = await executeDeviceOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: mockStatus, pairedItem: { item: 0 } }]);
    });
  });
});

describe('Account Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://api.shiftcrypto.ch/v1'
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn()
			}
		};
	});

	it('should get all accounts successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getAccounts')
			.mockReturnValueOnce('device123')
			.mockReturnValueOnce('btc');
		
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue([
			{ id: 'acc1', name: 'Account 1', coinType: 'btc' }
		]);

		const result = await executeAccountOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual([
			{ id: 'acc1', name: 'Account 1', coinType: 'btc' }
		]);
	});

	it('should create account successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('createAccount')
			.mockReturnValueOnce('device123')
			.mockReturnValueOnce('btc')
			.mockReturnValueOnce('unified');
		
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			id: 'acc2',
			coinType: 'btc',
			accountType: 'unified'
		});

		const result = await executeAccountOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json.coinType).toBe('btc');
	});

	it('should handle errors gracefully when continueOnFail is true', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getAccounts')
			.mockReturnValueOnce('device123')
			.mockReturnValueOnce('btc');
		
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Device not found'));
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);

		const result = await executeAccountOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json.error).toBe('Device not found');
	});

	it('should throw error when continueOnFail is false', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getAccounts')
			.mockReturnValueOnce('device123')
			.mockReturnValueOnce('btc');
		
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Device not found'));
		mockExecuteFunctions.continueOnFail.mockReturnValue(false);

		await expect(executeAccountOperations.call(mockExecuteFunctions, [{ json: {} }]))
			.rejects.toThrow('Device not found');
	});
});

describe('Transaction Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://api.shiftcrypto.ch/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	describe('getTransactions', () => {
		it('should get transactions successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'getTransactions';
					case 'deviceID': return 'test-device';
					case 'accountCode': return 'test-account';
					case 'limit': return 50;
					case 'offset': return 0;
					default: return undefined;
				}
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				transactions: [{ id: 'tx1', amount: '0.001' }],
			});

			const result = await executeTransactionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://api.shiftcrypto.ch/v1/devices/test-device/accounts/test-account/transactions',
				qs: { limit: 50, offset: 0 },
				headers: {
					'Authorization': 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});
			expect(result).toHaveLength(1);
		});

		it('should handle errors', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'getTransactions';
					case 'deviceID': return 'test-device';
					case 'accountCode': return 'test-account';
					default: return undefined;
				}
			});

			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeTransactionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result[0].json.error).toBe('API Error');
		});
	});

	describe('createTransaction', () => {
		it('should create transaction successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'createTransaction';
					case 'deviceID': return 'test-device';
					case 'accountCode': return 'test-account';
					case 'recipients': return { recipient: [{ address: 'test-addr', amount: '0.001' }] };
					case 'amount': return '0.001';
					case 'feeRate': return 1;
					default: return undefined;
				}
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				transactionId: 'tx123',
			});

			const result = await executeTransactionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'POST',
				url: 'https://api.shiftcrypto.ch/v1/devices/test-device/accounts/test-account/transactions',
				headers: {
					'Authorization': 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				body: {
					recipients: [{ address: 'test-addr', amount: '0.001' }],
					amount: '0.001',
					feeRate: 1,
				},
				json: true,
			});
			expect(result).toHaveLength(1);
		});
	});

	describe('signTransaction', () => {
		it('should sign transaction successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'signTransaction';
					case 'deviceID': return 'test-device';
					case 'accountCode': return 'test-account';
					case 'transaction': return { id: 'tx123' };
					default: return undefined;
				}
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				signedTransaction: 'signed-tx-data',
			});

			const result = await executeTransactionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'POST',
				url: 'https://api.shiftcrypto.ch/v1/devices/test-device/transactions/sign',
				headers: {
					'Authorization': 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				body: {
					transaction: { id: 'tx123' },
					accountCode: 'test-account',
				},
				json: true,
			});
			expect(result).toHaveLength(1);
		});
	});

	describe('broadcastTransaction', () => {
		it('should broadcast transaction successfully', async () => {
			mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
				switch (param) {
					case 'operation': return 'broadcastTransaction';
					case 'deviceID': return 'test-device';
					case 'signedTransaction': return { signedData: 'tx-data' };
					default: return undefined;
				}
			});

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
				txHash: 'broadcast-hash',
			});

			const result = await executeTransactionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'POST',
				url: 'https://api.shiftcrypto.ch/v1/devices/test-device/transactions/broadcast',
				headers: {
					'Authorization': 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				body: {
					signedTransaction: { signedData: 'tx-data' },
				},
				json: true,
			});
			expect(result).toHaveLength(1);
		});
	});
});

describe('Address Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://api.shiftcrypto.ch/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	it('should get addresses successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getAddresses')
			.mockReturnValueOnce('device123')
			.mockReturnValueOnce('account456')
			.mockReturnValueOnce(true);

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			addresses: ['address1', 'address2'],
		});

		const result = await executeAddressOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ addresses: ['address1', 'address2'] });
	});

	it('should generate address successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('generateAddress')
			.mockReturnValueOnce('device123')
			.mockReturnValueOnce('account456');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			address: 'new_address_123',
		});

		const result = await executeAddressOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ address: 'new_address_123' });
	});

	it('should get specific address successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getAddress')
			.mockReturnValueOnce('device123')
			.mockReturnValueOnce('account456')
			.mockReturnValueOnce('address789');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			address: 'address789',
			balance: 1000,
		});

		const result = await executeAddressOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ address: 'address789', balance: 1000 });
	});

	it('should verify address successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('verifyAddress')
			.mockReturnValueOnce('device123')
			.mockReturnValueOnce('account456')
			.mockReturnValueOnce('address789');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			verified: true,
		});

		const result = await executeAddressOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ verified: true });
	});

	it('should get unused addresses successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getUnusedAddresses')
			.mockReturnValueOnce('device123')
			.mockReturnValueOnce('account456')
			.mockReturnValueOnce(5);

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			addresses: ['unused1', 'unused2'],
		});

		const result = await executeAddressOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ addresses: ['unused1', 'unused2'] });
	});

	it('should handle errors and continue on fail', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getAddresses')
			.mockReturnValueOnce('device123')
			.mockReturnValueOnce('account456')
			.mockReturnValueOnce(false);

		mockExecuteFunctions.continueOnFail.mockReturnValue(true);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

		const result = await executeAddressOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ error: 'API Error' });
	});

	it('should throw error when not continuing on fail', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getAddresses')
			.mockReturnValueOnce('device123')
			.mockReturnValueOnce('account456')
			.mockReturnValueOnce(false);

		mockExecuteFunctions.continueOnFail.mockReturnValue(false);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

		await expect(
			executeAddressOperations.call(mockExecuteFunctions, [{ json: {} }])
		).rejects.toThrow('API Error');
	});

	it('should throw error for unknown operation', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('unknownOperation')
			.mockReturnValueOnce('device123')
			.mockReturnValueOnce('account456');

		mockExecuteFunctions.continueOnFail.mockReturnValue(false);

		await expect(
			executeAddressOperations.call(mockExecuteFunctions, [{ json: {} }])
		).rejects.toThrow('Unknown operation: unknownOperation');
	});
});

describe('Backup Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-key', 
        baseUrl: 'https://api.shiftcrypto.ch/v1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn()
      },
    };
  });

  it('should get backup status successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getBackupStatus')
      .mockReturnValueOnce('device123');
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      status: 'ready',
      hasBackup: true
    });

    const result = await executeBackupOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json.status).toBe('ready');
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.shiftcrypto.ch/v1/devices/device123/backup/status',
      headers: {
        'Authorization': 'Bearer test-key',
        'Content-Type': 'application/json'
      },
      json: true
    });
  });

  it('should create backup successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('createBackup')
      .mockReturnValueOnce('device123');
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      success: true,
      backupId: 'backup456'
    });

    const result = await executeBackupOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json.success).toBe(true);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://api.shiftcrypto.ch/v1/devices/device123/backup/create',
      headers: {
        'Authorization': 'Bearer test-key',
        'Content-Type': 'application/json'
      },
      json: true
    });
  });

  it('should verify backup successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('verifyBackup')
      .mockReturnValueOnce('device123');
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      verified: true
    });

    const result = await executeBackupOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json.verified).toBe(true);
  });

  it('should restore backup successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('restoreBackup')
      .mockReturnValueOnce('device123')
      .mockReturnValueOnce('word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12');
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      success: true,
      message: 'Backup restored successfully'
    });

    const result = await executeBackupOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json.success).toBe(true);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://api.shiftcrypto.ch/v1/devices/device123/backup/restore',
      headers: {
        'Authorization': 'Bearer test-key',
        'Content-Type': 'application/json'
      },
      body: {
        mnemonicWords: 'word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12'
      },
      json: true
    });
  });

  it('should get backup words successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getBackupWords')
      .mockReturnValueOnce('device123');
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      words: ['word1', 'word2', 'word3', 'word4', 'word5', 'word6', 'word7', 'word8', 'word9', 'word10', 'word11', 'word12']
    });

    const result = await executeBackupOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json.words).toHaveLength(12);
  });

  it('should handle errors appropriately', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getBackupStatus')
      .mockReturnValueOnce('device123');
    
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Device not found'));
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const result = await executeBackupOperations.call(mockExecuteFunctions, [{ json: {} }]);
    
    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('Device not found');
  });

  it('should throw error when continueOnFail is false', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getBackupStatus')
      .mockReturnValueOnce('device123');
    
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
    mockExecuteFunctions.continueOnFail.mockReturnValue(false);

    await expect(executeBackupOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('API Error');
  });
});

describe('Settings Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://api.shiftcrypto.ch/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	it('should get device settings successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getSettings')
			.mockReturnValueOnce('device123');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			autoLock: true,
			sleepMode: false,
		});

		const result = await executeSettingsOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({
			autoLock: true,
			sleepMode: false,
		});
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://api.shiftcrypto.ch/v1/devices/device123/settings',
			headers: {
				'Authorization': 'Bearer test-key',
				'Content-Type': 'application/json',
			},
			json: true,
		});
	});

	it('should update device settings successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('updateSettings')
			.mockReturnValueOnce('device123')
			.mockReturnValueOnce('{"autoLock": false, "sleepMode": true}');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			success: true,
		});

		const result = await executeSettingsOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ success: true });
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'PUT',
			url: 'https://api.shiftcrypto.ch/v1/devices/device123/settings',
			headers: {
				'Authorization': 'Bearer test-key',
				'Content-Type': 'application/json',
			},
			body: {
				autoLock: false,
				sleepMode: true,
			},
			json: true,
		});
	});

	it('should get password status successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getPasswordStatus')
			.mockReturnValueOnce('device123');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			passwordSet: true,
		});

		const result = await executeSettingsOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ passwordSet: true });
	});

	it('should set device password successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('setPassword')
			.mockReturnValueOnce('device123')
			.mockReturnValueOnce('newpassword123');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			success: true,
		});

		const result = await executeSettingsOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ success: true });
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'POST',
			url: 'https://api.shiftcrypto.ch/v1/devices/device123/settings/password',
			headers: {
				'Authorization': 'Bearer test-key',
				'Content-Type': 'application/json',
			},
			body: {
				password: 'newpassword123',
			},
			json: true,
		});
	});

	it('should change device password successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('changePassword')
			.mockReturnValueOnce('device123')
			.mockReturnValueOnce('currentpass123')
			.mockReturnValueOnce('newpass456');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			success: true,
		});

		const result = await executeSettingsOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ success: true });
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'PUT',
			url: 'https://api.shiftcrypto.ch/v1/devices/device123/settings/password',
			headers: {
				'Authorization': 'Bearer test-key',
				'Content-Type': 'application/json',
			},
			body: {
				currentPassword: 'currentpass123',
				newPassword: 'newpass456',
			},
			json: true,
		});
	});

	it('should remove device password successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('removePassword')
			.mockReturnValueOnce('device123')
			.mockReturnValueOnce('password123');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			success: true,
		});

		const result = await executeSettingsOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ success: true });
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'DELETE',
			url: 'https://api.shiftcrypto.ch/v1/devices/device123/settings/password',
			headers: {
				'Authorization': 'Bearer test-key',
				'Content-Type': 'application/json',
			},
			body: {
				password: 'password123',
			},
			json: true,
		});
	});

	it('should handle API errors gracefully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getSettings')
			.mockReturnValueOnce('device123');

		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(
			new Error('Device not found'),
		);
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);

		const result = await executeSettingsOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ error: 'Device not found' });
	});

	it('should throw error for unknown operation', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('unknownOperation')
			.mockReturnValueOnce('device123');

		await expect(
			executeSettingsOperations.call(mockExecuteFunctions, [{ json: {} }]),
		).rejects.toThrow('Unknown operation: unknownOperation');
	});
});
});
