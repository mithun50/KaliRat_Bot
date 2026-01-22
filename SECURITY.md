# Security Policy

## Purpose

This project is provided **strictly for educational and authorized security research purposes**. It demonstrates vulnerabilities in mobile device security to help:

- Security researchers understand RAT architectures
- Penetration testers (with proper authorization)
- Students learning about cybersecurity
- Defenders building detection mechanisms

## Legal Warning

**Unauthorized use of this software is illegal.**

Using this tool without explicit written permission from the device owner violates:

| Jurisdiction | Law |
|--------------|-----|
| United States | Computer Fraud and Abuse Act (CFAA) |
| United Kingdom | Computer Misuse Act 1990 |
| European Union | GDPR, National cybercrime laws |
| India | Information Technology Act 2000 |
| International | Budapest Convention on Cybercrime |

Violations can result in:
- Criminal prosecution
- Imprisonment
- Substantial fines
- Civil liability

## Authorized Use Cases

This tool should ONLY be used in:

1. **Penetration Testing** - With written authorization from the target organization
2. **Security Research** - In isolated lab environments
3. **Educational Settings** - Under instructor supervision
4. **Personal Devices** - Testing on your own devices only

## Responsible Disclosure

If you discover security vulnerabilities in this project:

1. **Do NOT** create public issues with exploit details
2. Contact the maintainers privately
3. Allow reasonable time for fixes before disclosure
4. Follow coordinated disclosure practices

## Detection & Defense

### For Security Teams

**Network Indicators:**
- Socket.IO WebSocket connections to unknown hosts
- Telegram Bot API traffic patterns
- HTTP POST requests to `/upload` endpoints
- Unusual outbound connections from mobile devices

**Behavioral Indicators:**
- Excessive Android permissions
- Background services with network access
- Camera/microphone activation without UI
- SMS access without messaging app

### Recommended Defenses

1. **Mobile Device Management (MDM)** - Control app installations
2. **Network Monitoring** - Detect C2 traffic patterns
3. **Endpoint Protection** - Mobile security software
4. **User Training** - Phishing awareness
5. **App Vetting** - Only install from trusted sources

## Reporting Abuse

If you observe this tool being used maliciously:

1. Document evidence (do not tamper)
2. Report to local law enforcement
3. Contact the affected platform (Telegram, hosting provider)
4. Report the Telegram bot to [@BotFather](https://t.me/BotFather)

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND. THE AUTHORS ARE NOT RESPONSIBLE FOR ANY MISUSE OR DAMAGE CAUSED BY THIS SOFTWARE. USE AT YOUR OWN RISK AND ONLY FOR LEGAL, AUTHORIZED PURPOSES.

---

**Remember:** With great power comes great responsibility. Use this knowledge to defend, not attack.
