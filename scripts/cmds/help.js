const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

/**
* @author TRØN ARËS
* @message TRØN ARËS CYBERNETIC INTERFACE v2.0
*/

module.exports = {
	config: {
		name: "help",
		version: "2.0",
		author: "TRØN ARËS",
		countDown: 5,
		role: 0,
		description: {
			vi: "Truy cập giao diện hệ thống TRØN ARËS",
			en: "Access TRØN ARËS Cybernetic Interface"
		},
		category: "⚡ system",
		guide: {
			vi: "   {pn} [để trống | <số trang> | <tên lệnh>]"
				+ "\n   {pn} <tên lệnh> [-u | usage | -g | guide]: hiển thị hướng dẫn sử dụng"
				+ "\n   {pn} <tên lệnh> [-i | info]: hiển thị thông tin lệnh"
				+ "\n   {pn} <tên lệnh> [-r | role]: hiển thị quyền hạn"
				+ "\n   {pn} <tên lệnh> [-a | alias]: hiển thị tên viết tắt",
			en: "   {pn} [empty | <page number> | <command name>]"
				+ "\n   {pn} <command name> [-u | usage | -g | guide]: show command usage"
				+ "\n   {pn} <command name> [-i | info]: show command info"
				+ "\n   {pn} <command name> [-r | role]: show command role"
				+ "\n   {pn} <command name> [-a | alias]: show command alias"
		},
		priority: 1
	},

	langs: {
		vi: {
			help: "┌─━━━━━═━═━━━━━─┐\n"
				+ "   ⚡ TRØN ARËS HUD ⚡\n"
				+ "└─━━━━━═━═━━━━━─┘\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   🛰️ COMMAND PROTOCOLS\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n"
				+ "%1\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   📊 SYSTEM STATUS\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "│ Trang [ %2/%3 ]\n"
				+ "│ Tổng lệnh: %4\n"
				+ "│ » %5help <số trang> - Chuyển trang\n"
				+ "│ » %5help <tên lệnh> - Chi tiết lệnh\n"
				+ "╰━━━━━━━━━━━━━━━━━━━",
			help2: "┌─━━━━━═━═━━━━━─┐\n"
				+ "   ⚡ TRØN ARËS HUD ⚡\n"
				+ "└─━━━━━═━═━━━━━─┘\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   🛰️ COMMAND PROTOCOLS\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n"
				+ "%1\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   📊 SYSTEM STATUS\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "│ Tổng lệnh: %2\n"
				+ "│ » %3help <tên lệnh> - Chi tiết lệnh\n"
				+ "╰━━━━━━━━━━━━━━━━━━━",
			commandNotFound: "❌ LỖI: Lệnh \"%1\" không tồn tại trong cơ sở dữ liệu",
			getInfoCommand: "┌─━━━━━═━═━━━━━─┐\n"
				+ "   ⚡ COMMAND ANALYSIS ⚡\n"
				+ "└─━━━━━═━═━━━━━─┘\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   🛰️ PROTOCOL DATA\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n"
				+ "◈ IDENTIFIER: %1\n"
				+ "◈ DESCRIPTION: %2\n"
				+ "◈ ALIAS PROTOCOLS: %3\n"
				+ "◈ GROUP ALIASES: %4\n"
				+ "◈ VERSION: %5\n"
				+ "◈ SECURITY LEVEL: %6\n"
				+ "◈ COOLDOWN: %7s\n"
				+ "◈ DEVELOPER: %8\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   📖 EXECUTION SYNTAX\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "│%9\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   ⚠️ SYSTEM NOTES\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "│ » Nội dung <XXXXX> có thể thay đổi\n"
				+ "│ » Nội dung [a|b|c] là a hoặc b hoặc c\n"
				+ "╰━━━━━━━━━━━━━━━━━━━",
			onlyInfo: "┌─━━━━━═━═━━━━━─┐\n"
				+ "   ⚡ COMMAND INFO ⚡\n"
				+ "└─━━━━━═━═━━━━━─┘\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   🛰️ PROTOCOL DATA\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "◈ IDENTIFIER: %1\n"
				+ "◈ DESCRIPTION: %2\n"
				+ "◈ ALIAS PROTOCOLS: %3\n"
				+ "◈ GROUP ALIASES: %4\n"
				+ "◈ VERSION: %5\n"
				+ "◈ SECURITY LEVEL: %6\n"
				+ "◈ COOLDOWN: %7s\n"
				+ "◈ DEVELOPER: %8\n"
				+ "╰━━━━━━━━━━━━━━━━━━━",
			onlyUsage: "┌─━━━━━═━═━━━━━─┐\n"
				+ "   ⚡ EXECUTION SYNTAX ⚡\n"
				+ "└─━━━━━═━═━━━━━─┘\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   📖 USAGE PROTOCOL\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "│%1\n"
				+ "╰━━━━━━━━━━━━━━━━━━━",
			onlyAlias: "┌─━━━━━═━═━━━━━─┐\n"
				+ "   ⚡ ALIAS PROTOCOLS ⚡\n"
				+ "└─━━━━━═━═━━━━━─┘\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   🔤 COMMAND ALIASES\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "◈ GLOBAL ALIASES: %1\n"
				+ "◈ GROUP ALIASES: %2\n"
				+ "╰━━━━━━━━━━━━━━━━━━━",
			onlyRole: "┌─━━━━━═━═━━━━━─┐\n"
				+ "   ⚡ SECURITY LEVEL ⚡\n"
				+ "└─━━━━━═━═━━━━━─┘\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   🛡️ PERMISSION PROTOCOL\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "│%1\n"
				+ "╰━━━━━━━━━━━━━━━━━━━",
			doNotHave: "Không có",
			roleText0: "🟢 LEVEL 0 (Tất cả người dùng)",
			roleText1: "🟡 LEVEL 1 (Quản trị viên nhóm)",
			roleText2: "🔴 LEVEL 2 (Admin bot)",
			roleText0setRole: "🟢 LEVEL 0 (set role, tất cả người dùng)",
			roleText1setRole: "🟡 LEVEL 1 (set role, quản trị viên nhóm)",
			pageNotFound: "❌ LỖI: Trang %1 không tồn tại"
		},
		en: {
			help: "┌─━━━━━═━═━━━━━─┐\n"
				+ "   ⚡ TRØN ARËS HUD ⚡\n"
				+ "└─━━━━━═━═━━━━━─┘\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   🛰️ COMMAND PROTOCOLS\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n"
				+ "%1\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   📊 SYSTEM STATUS\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "│ Page [ %2/%3 ]\n"
				+ "│ Total Commands: %4\n"
				+ "│ » %5help <page> - Switch page\n"
				+ "│ » %5help <command> - Command details\n"
				+ "╰━━━━━━━━━━━━━━━━━━━",
			help2: "┌─━━━━━═━═━━━━━─┐\n"
				+ "   ⚡ TRØN ARËS HUD ⚡\n"
				+ "└─━━━━━═━═━━━━━─┘\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   🛰️ COMMAND PROTOCOLS\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n"
				+ "%1\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   📊 SYSTEM STATUS\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "│ Total Commands: %2\n"
				+ "│ » %3help <command> - Command details\n"
				+ "╰━━━━━━━━━━━━━━━━━━━",
			commandNotFound: "❌ ERROR: Command \"%1\" not found in database",
			getInfoCommand: "┌─━━━━━═━═━━━━━─┐\n"
				+ "   ⚡ COMMAND ANALYSIS ⚡\n"
				+ "└─━━━━━═━═━━━━━─┘\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   🛰️ PROTOCOL DATA\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n"
				+ "◈ IDENTIFIER: %1\n"
				+ "◈ DESCRIPTION: %2\n"
				+ "◈ ALIAS PROTOCOLS: %3\n"
				+ "◈ GROUP ALIASES: %4\n"
				+ "◈ VERSION: %5\n"
				+ "◈ SECURITY LEVEL: %6\n"
				+ "◈ COOLDOWN: %7s\n"
				+ "◈ DEVELOPER: %8\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   📖 EXECUTION SYNTAX\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "│%9\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   ⚠️ SYSTEM NOTES\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "│ » Content inside <XXXXX> can be changed\n"
				+ "│ » Content inside [a|b|c] is a or b or c\n"
				+ "╰━━━━━━━━━━━━━━━━━━━",
			onlyInfo: "┌─━━━━━═━═━━━━━─┐\n"
				+ "   ⚡ COMMAND INFO ⚡\n"
				+ "└─━━━━━═━═━━━━━─┘\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   🛰️ PROTOCOL DATA\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "◈ IDENTIFIER: %1\n"
				+ "◈ DESCRIPTION: %2\n"
				+ "◈ ALIAS PROTOCOLS: %3\n"
				+ "◈ GROUP ALIASES: %4\n"
				+ "◈ VERSION: %5\n"
				+ "◈ SECURITY LEVEL: %6\n"
				+ "◈ COOLDOWN: %7s\n"
				+ "◈ DEVELOPER: %8\n"
				+ "╰━━━━━━━━━━━━━━━━━━━",
			onlyUsage: "┌─━━━━━═━═━━━━━─┐\n"
				+ "   ⚡ EXECUTION SYNTAX ⚡\n"
				+ "└─━━━━━═━═━━━━━─┘\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   📖 USAGE PROTOCOL\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "│%1\n"
				+ "╰━━━━━━━━━━━━━━━━━━━",
			onlyAlias: "┌─━━━━━═━═━━━━━─┐\n"
				+ "   ⚡ ALIAS PROTOCOLS ⚡\n"
				+ "└─━━━━━═━═━━━━━─┘\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   🔤 COMMAND ALIASES\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "◈ GLOBAL ALIASES: %1\n"
				+ "◈ GROUP ALIASES: %2\n"
				+ "╰━━━━━━━━━━━━━━━━━━━",
			onlyRole: "┌─━━━━━═━═━━━━━─┐\n"
				+ "   ⚡ SECURITY LEVEL ⚡\n"
				+ "└─━━━━━═━═━━━━━─┘\n\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "   🛡️ PERMISSION PROTOCOL\n"
				+ "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"
				+ "│%1\n"
				+ "╰━━━━━━━━━━━━━━━━━━━",
			doNotHave: "None",
			roleText0: "🟢 LEVEL 0 (All users)",
			roleText1: "🟡 LEVEL 1 (Group administrators)",
			roleText2: "🔴 LEVEL 2 (Admin bot)",
			roleText0setRole: "🟢 LEVEL 0 (set role, all users)",
			roleText1setRole: "🟡 LEVEL 1 (set role, group administrators)",
			pageNotFound: "❌ ERROR: Page %1 does not exist"
		}
	},

	onStart: async function ({ message, args, event, threadsData, getLang, role, globalData }) {
		const langCode = await threadsData.get(event.threadID, "data.lang") || global.GoatBot.config.language;
		let customLang = {};
		const pathCustomLang = path.normalize(`${process.cwd()}/languages/cmds/${langCode}.js`);
		if (fs.existsSync(pathCustomLang))
			customLang = require(pathCustomLang);

		const { threadID } = event;
		const threadData = await threadsData.get(threadID);
		const prefix = getPrefix(threadID);
		let sortHelp = threadData.settings.sortHelp || "name";
		if (!["category", "name"].includes(sortHelp))
			sortHelp = "name";
		const commandName = (args[0] || "").toLowerCase();
		let command = commands.get(commandName) || commands.get(aliases.get(commandName));
		const aliasesData = threadData.data.aliases || {};

		if (!command) {
			for (const cmdName in aliasesData) {
				if (aliasesData[cmdName].includes(commandName)) {
					command = commands.get(cmdName);
					break;
				}
			}
		}

		if (!command) {
			const globalAliasesData = await globalData.get('setalias', 'data', []);
			for (const item of globalAliasesData) {
				if (item.aliases.includes(commandName)) {
					command = commands.get(item.commandName);
					break;
				}
			}
		}

		// ———————————————— LIST ALL COMMAND ——————————————— //
		if (!command && !args[0] || !isNaN(args[0])) {
			const arrayInfo = [];
			let msg = "";
			
			// Notification header
			const notificationHeader = `📢 𝗡𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻 𝗳𝗿𝗼𝗺 𝗮𝗱𝗺𝗶𝗻 𝗯𝗼𝘁 𝘁𝗼 𝗮𝗹𝗹 𝗰𝗵𝗮𝘁 𝗴𝗿𝗼𝘂𝗽𝘀 (𝗱𝗼 𝗻𝗼𝘁 𝗿𝗲𝗽𝗹𝘆 𝘁𝗼 𝘁𝗵𝗶𝘀 𝗺𝗲𝘀𝘀𝗮𝗴𝗲)\n────────────────\n𝗛𝗲𝗹𝗹𝗼\n\n`;
			
			if (sortHelp == "name") {
				const page = parseInt(args[0]) || 1;
				const numberOfOnePage = 30;
				
				for (const [name, value] of commands) {
					if (value.config.role > 1 && role < value.config.role)
						continue;
					
					let describe = name;
					let description;
					const descriptionCustomLang = customLang[name]?.description;
					
					if (descriptionCustomLang != undefined)
						description = checkLangObject(descriptionCustomLang, langCode);
					else if (value.config.description)
						description = checkLangObject(value.config.description, langCode);
					
					if (description)
						describe += `: ${cropContent(description.charAt(0).toUpperCase() + description.slice(1), 50)}`;
					
					arrayInfo.push({
						data: `◈ ${describe}`,
						priority: value.priority || 0
					});
				}

				arrayInfo.sort((a, b) => a.data.localeCompare(b.data));
				arrayInfo.sort((a, b) => a.priority > b.priority ? -1 : 1);
				
				const { allPage, totalPage } = global.utils.splitPage(arrayInfo, numberOfOnePage);
				if (page < 1 || page > totalPage)
					return message.reply(getLang("pageNotFound", page));

				const returnArray = allPage[page - 1] || [];
				const startNumber = (page - 1) * numberOfOnePage + 1;
				
				msg = notificationHeader + getLang("help", 
					returnArray.reduce((text, item, index) => 
						text += `${item.data}\n`, ''
					), 
					page, totalPage, commands.size, prefix
				);
				
				await message.reply(msg);
			}
			else if (sortHelp == "category") {
				// Organize by category with cyberpunk style
				const categoryEmojis = {
					'admin': '🔧', 'ai': '🤖', 'ai-generated': '🌀', 'ai-image': '🎨',
					'box chat': '💬', 'config': '⚙️', 'contacts admin': '📞',
					'custom': '🛠️', 'demo': '📂', 'economy': '💎', 'fun': '🎉',
					'game': '🎮', 'image': '🌌', 'info': '📌', 'market': '🏪',
					'media': '📥', 'music': '🎵', 'nsfw': '🔞', 'other': '🌤️',
					'owner': '⚡', 'premium': '🌟', 'rank': '📊', 'software': '📱',
					'system': '🖥️', 'tools': '🔍', 'tts': '🔊', 'uploader': '📤',
					'utility': '🧰', 'wiki': '📚', 'xudlingpong': '🏓'
				};

				for (const [, value] of commands) {
					if (value.config.role > 1 && role < value.config.role)
						continue;
					
					const category = value.config.category?.toLowerCase() || "other";
					const indexCategory = arrayInfo.findIndex(item => item.category == category);

					if (indexCategory != -1)
						arrayInfo[indexCategory].names.push(value.config.name);
					else
						arrayInfo.push({
							category: category,
							names: [value.config.name]
						});
				}

				arrayInfo.sort((a, b) => a.category.localeCompare(b.category));
				
				let categoryMsg = "";
				arrayInfo.forEach((data, index) => {
					const emoji = categoryEmojis[data.category] || '◈';
					const categoryName = data.category.toUpperCase();
					
					categoryMsg += `┏━━━━━━━━━━━━━━━━━━━━━━━┓\n`;
					categoryMsg += `┃  ${emoji} ${categoryName}\n`;
					categoryMsg += `┣━━━━━━━━━━━━━━━━━━━━━━━┫\n`;
					
					// Organize commands in columns for better display
					const sortedNames = data.names.sort();
					const maxPerColumn = 4;
					const columns = [];
					
					for (let i = 0; i < sortedNames.length; i += maxPerColumn) {
						columns.push(sortedNames.slice(i, i + maxPerColumn));
					}
					
					const maxRows = Math.max(...columns.map(col => col.length));
					for (let row = 0; row < maxRows; row++) {
						let rowText = "┃ ";
						for (let col = 0; col < columns.length; col++) {
							if (columns[col][row]) {
								rowText += `◈ ${columns[col][row]}${col < columns.length - 1 ? "    " : ""}`;
							}
						}
						categoryMsg += `${rowText}\n`;
					}
					
					categoryMsg += `┗━━━━━━━━━━━━━━━━━━━━━━━┛\n\n`;
				});

				msg = notificationHeader + getLang("help2", categoryMsg, commands.size, prefix);
				message.reply(msg);
			}
		}
		// ———————————— COMMAND DOES NOT EXIST ———————————— //
		else if (!command && args[0]) {
			return message.reply(getLang("commandNotFound", args[0]));
		}
		// ————————————————— INFO COMMAND ————————————————— //
		else {
			const formSendMessage = {};
			const configCommand = command.config;

			let guide = configCommand.guide?.[langCode] || configCommand.guide?.["en"];
			if (guide == undefined)
				guide = customLang[configCommand.name]?.guide?.[langCode] || customLang[configCommand.name]?.guide?.["en"];

			guide = guide || { body: "" };
			if (typeof guide == "string")
				guide = { body: guide };
			
			const guideBody = guide.body
				.replace(/\{prefix\}|\{p\}/g, prefix)
				.replace(/\{name\}|\{n\}/g, configCommand.name)
				.replace(/\{pn\}/g, prefix + configCommand.name);

			const aliasesString = configCommand.aliases ? configCommand.aliases.join(" | ") : getLang("doNotHave");
			const aliasesThisGroup = threadData.data.aliases ? (threadData.data.aliases[configCommand.name] || []).join(" | ") : getLang("doNotHave");

			let roleOfCommand = configCommand.role;
			let roleIsSet = false;
			if (threadData.data.setRole?.[configCommand.name]) {
				roleOfCommand = threadData.data.setRole[configCommand.name];
				roleIsSet = true;
			}

			const roleText = roleOfCommand == 0 ?
				(roleIsSet ? getLang("roleText0setRole") : getLang("roleText0")) :
				roleOfCommand == 1 ?
					(roleIsSet ? getLang("roleText1setRole") : getLang("roleText1")) :
					getLang("roleText2");

			const author = configCommand.author;
			const descriptionCustomLang = customLang[configCommand.name]?.description;
			let description = checkLangObject(configCommand.description, langCode);
			if (description == undefined)
				if (descriptionCustomLang != undefined)
					description = checkLangObject(descriptionCustomLang, langCode);
				else
					description = getLang("doNotHave");

			let sendWithAttachment = false;

			if (args[1]?.match(/^-g|guide|-u|usage$/)) {
				formSendMessage.body = getLang("onlyUsage", guideBody.split("\n").join("\n│"));
				sendWithAttachment = true;
			}
			else if (args[1]?.match(/^-a|alias|aliase|aliases$/))
				formSendMessage.body = getLang("onlyAlias", aliasesString, aliasesThisGroup);
			else if (args[1]?.match(/^-r|role$/))
				formSendMessage.body = getLang("onlyRole", roleText);
			else if (args[1]?.match(/^-i|info$/))
				formSendMessage.body = getLang(
					"onlyInfo",
					configCommand.name,
					description,
					aliasesString,
					aliasesThisGroup,
					configCommand.version,
					roleText,
					configCommand.countDown || 1,
					author || ""
				);
			else {
				formSendMessage.body = getLang(
					"getInfoCommand",
					configCommand.name,
					description,
					aliasesString,
					aliasesThisGroup,
					configCommand.version,
					roleText,
					configCommand.countDown || 1,
					author || "",
					guideBody.split("\n").join("\n│")
				);
				sendWithAttachment = true;
			}

			if (sendWithAttachment && guide.attachment) {
				if (typeof guide.attachment == "object" && !Array.isArray(guide.attachment)) {
					const promises = [];
					formSendMessage.attachment = [];

					for (const keyPathFile in guide.attachment) {
						const pathFile = path.normalize(keyPathFile);

						if (!fs.existsSync(pathFile)) {
							const cutDirPath = path.dirname(pathFile).split(path.sep);
							for (let i = 0; i < cutDirPath.length; i++) {
								const pathCheck = `${cutDirPath.slice(0, i + 1).join(path.sep)}${path.sep}`;
								if (!fs.existsSync(pathCheck))
									fs.mkdirSync(pathCheck);
							}
							const getFilePromise = axios.get(guide.attachment[keyPathFile], { responseType: 'arraybuffer' })
								.then(response => {
									fs.writeFileSync(pathFile, Buffer.from(response.data));
								});

							promises.push({
								pathFile,
								getFilePromise
							});
						}
						else {
							promises.push({
								pathFile,
								getFilePromise: Promise.resolve()
							});
						}
					}

					await Promise.all(promises.map(item => item.getFilePromise));
					for (const item of promises)
						formSendMessage.attachment.push(fs.createReadStream(item.pathFile));
				}
			}

			return message.reply(formSendMessage);
		}
	}
};

function checkLangObject(data, langCode) {
	if (typeof data == "string")
		return data;
	if (typeof data == "object" && !Array.isArray(data))
		return data[langCode] || data.en || undefined;
	return undefined;
}

function cropContent(content, max) {
	if (content.length > max) {
		content = content.slice(0, max - 3);
		content = content + "...";
	}
	return content;
}
