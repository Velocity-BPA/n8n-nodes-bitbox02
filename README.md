# n8n-nodes-bitbox02

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

An n8n community node for integrating with BitBox02 hardware wallet functionality. This node provides 6 resources for comprehensive cryptocurrency wallet management including device control, account operations, transaction handling, address generation, backup management, and settings configuration.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Bitcoin](https://img.shields.io/badge/Bitcoin-Compatible-orange)
![Hardware Wallet](https://img.shields.io/badge/Hardware-Wallet-green)
![Crypto](https://img.shields.io/badge/Crypto-Secure-yellow)

## Features

- **Device Management** - Connect, initialize, and manage BitBox02 hardware wallet devices
- **Account Operations** - Create, list, and manage cryptocurrency accounts across multiple networks
- **Transaction Processing** - Sign, send, and monitor Bitcoin and cryptocurrency transactions
- **Address Generation** - Generate secure receiving and change addresses with HD wallet support
- **Backup & Recovery** - Create and restore wallet backups with seed phrase management
- **Settings Control** - Configure device settings, security options, and network preferences
- **Multi-Currency Support** - Handle Bitcoin, Ethereum, and other supported cryptocurrencies
- **Hardware Security** - Leverage BitBox02's secure element for key storage and operations

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-bitbox02`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-bitbox02
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-bitbox02.git
cd n8n-nodes-bitbox02
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-bitbox02
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | BitBox02 device API key for authentication | Yes |
| Device ID | Unique identifier of the BitBox02 device | Yes |
| Passphrase | Optional passphrase for additional security | No |

## Resources & Operations

### 1. Device

| Operation | Description |
|-----------|-------------|
| Connect | Establish connection to BitBox02 device |
| Disconnect | Safely disconnect from device |
| Get Info | Retrieve device information and status |
| Initialize | Initialize new device with seed |
| Reset | Factory reset device |
| Lock | Lock device for security |
| Unlock | Unlock device with PIN |

### 2. Account

| Operation | Description |
|-----------|-------------|
| List | Get all accounts on device |
| Create | Create new cryptocurrency account |
| Get Details | Retrieve account information and balance |
| Delete | Remove account from device |
| Set Active | Set account as currently active |
| Get Balance | Get current account balance |

### 3. Transaction

| Operation | Description |
|-----------|-------------|
| Create | Create new transaction |
| Sign | Sign transaction with device |
| Send | Broadcast signed transaction |
| Get Status | Check transaction status |
| List | Get transaction history |
| Get Details | Retrieve transaction information |
| Cancel | Cancel pending transaction |

### 4. Address

| Operation | Description |
|-----------|-------------|
| Generate | Generate new receiving address |
| Verify | Verify address on device screen |
| List Used | Get previously used addresses |
| Get Change | Generate change address |
| Validate | Validate address format |
| Export | Export address with public key |

### 5. Backup

| Operation | Description |
|-----------|-------------|
| Create | Create wallet backup |
| Verify | Verify backup integrity |
| Restore | Restore from backup |
| List | Get available backups |
| Delete | Remove backup file |
| Export Seed | Export seed phrase |

### 6. Settings

| Operation | Description |
|-----------|-------------|
| Get | Retrieve current device settings |
| Update | Modify device configuration |
| Reset | Reset settings to defaults |
| Set PIN | Change device PIN |
| Set Name | Set device name |
| Configure Network | Set network preferences |

## Usage Examples

```javascript
// Connect to BitBox02 device and get device info
{
  "nodes": [
    {
      "parameters": {
        "resource": "device",
        "operation": "connect"
      },
      "type": "n8n-nodes-bitbox02.bitbox02",
      "typeVersion": 1
    }
  ]
}
```

```javascript
// Generate new Bitcoin receiving address
{
  "nodes": [
    {
      "parameters": {
        "resource": "address",
        "operation": "generate",
        "currency": "BTC",
        "addressType": "receiving"
      },
      "type": "n8n-nodes-bitbox02.bitbox02",
      "typeVersion": 1
    }
  ]
}
```

```javascript
// Create and sign Bitcoin transaction
{
  "nodes": [
    {
      "parameters": {
        "resource": "transaction",
        "operation": "create",
        "recipient": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        "amount": "0.001",
        "currency": "BTC",
        "feeRate": "10"
      },
      "type": "n8n-nodes-bitbox02.bitbox02",
      "typeVersion": 1
    }
  ]
}
```

```javascript
// Create wallet backup
{
  "nodes": [
    {
      "parameters": {
        "resource": "backup",
        "operation": "create",
        "backupName": "wallet-backup-2024",
        "password": "secure-backup-password"
      },
      "type": "n8n-nodes-bitbox02.bitbox02",
      "typeVersion": 1
    }
  ]
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| Device Not Connected | BitBox02 device is not connected or recognized | Ensure device is plugged in and unlocked |
| Invalid PIN | Incorrect PIN entered for device unlock | Verify PIN and try again, check for device lock |
| Insufficient Funds | Account balance too low for transaction | Check account balance and reduce transaction amount |
| Invalid Address | Provided address format is incorrect | Validate address format for selected cryptocurrency |
| Transaction Failed | Transaction could not be broadcast | Check network connectivity and transaction parameters |
| Backup Error | Backup creation or restoration failed | Ensure sufficient storage and valid backup password |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-bitbox02/issues)
- **BitBox02 Documentation**: [BitBox02 API Docs](https://shiftcrypto.github.io/bitbox02-api-reference/)
- **Hardware Wallet Community**: [BitBox Community Forum](https://bitbox.swiss/community/)