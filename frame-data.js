import { CancelFlags, MoveTypeFlags, MoveAttributeFlags } from "./flags";

export class FrameDataBuilder {
	constructor() {
		this.officialName = "";
		this.nickname = "";
		this.classicCommand = "";
		this.modernCommand = null;

		this.startup = 0;
		this.active = [];
		this.recovery = 0;
		this.whiffRecovery = 0;
		this.hitstop = 0;

		this.advOnHit = 0;
		this.advOnBlock = 0;
		this.advOnCounter = 0;
		this.advOnPunish = 0;

		this.stancelOnHit = 0;
		this.stancelOnBlock = 0;
		this.stancelOnCounter = 0;
		this.stancelOnPunish = 0;

		this.kdaOnHit = null;
		this.kdaOnCounter = null;
		this.kdaOnPunish = null;

		this.moveType = MoveTypeFlags.NORMAL;
		this.cancel = CancelFlags.NONE;
		this.flags = MoveAttributeFlags.NONE;
	}

	build() {
		return new FrameData(this.officialName, this.nickname, this.classicCommand, this.modernCommand,
								this.startup, this.active, this.recovery, this.whiffRecovery, this.hitstop,
								this.advOnHit, this.advOnBlock, this.advOnCounter, this.advOnPunish,
								this.stancelOnHit, this.stancelOnBlock, this.stancelOnCounter, this.stancelOnPunish,
								this.kdaOnHit, this.kdaOnCounter, this.kdaOnPunish,
								this.moveType, this.cancelFlags, this.flags);
	}

	setActive(act) {
		this.active = act;
		return this;
	}

	setAdvantageOnBlock(adv) {
		this.advOnBlock = adv;
		return this;
	}
	
	setAdvantageOnCounter(adv) {
		this.advOnCounter = adv;
		return this;
	}
	
	setAdvantageOnHit(adv) {
		this.advOnHit = adv;
		this.advOnCounter = Math.max(this.advOnCounter, this.advOnHit + 2);
		this.advOnPunish = Math.max(this.advOnPunish, this.advOnHit + 4);
		return this;
	}
	
	setAdvantageOnPunish(adv) {
		this.advOnPunish = adv;
		return this;
	}

	setAttributeFlags(flags) {
		this.flags = flags;
		return this;
	}
	
	setCancelType(typeFlags) {
		this.cancel = typeFlags;
		return this;
	}

	setClassicCommand(name) {
		this.nickname = name;
		return this;
	}

	setHitstop(stop) {
		this.hitstop = stop;
		return this;
	}
	
	setKdaOnCounter(adv) {
		this.kdaOnCounter = adv;
		return this;
	}

	setKdaOnHit(adv) {
		this.kdaOnHit = adv;
		return this;
	}
	
	setKdaOnPunish(adv) {
		this.kdaOnPunish = adv;
		return this;
	}

	setModernCommand(name) {
		this.nickname = name;
		return this;
	}

	setMoveType(typeFlags) {
		this.moveType = typeFlags;
		return this;
	}

	setNickname(name) {
		this.nickname = name;
		return this;
	}

	setOfficialName(name) {
		this.officialName = name;
		return this;
	}

	setRecovery(rec) {
		this.recovery = rec;
		return this;
	}

	setStancelOnBlock(adv) {
		this.stancelOnBlock = adv;
		return this;
	}
	
	setStancelOnCounter(adv) {
		this.stancelOnCounter = adv;
		return this;
	}
	
	setStancelOnHit(adv) {
		this.stancelOnHit = adv;
		this.stancelOnCounter = Math.max(this.stancelOnCounter, this.stancelOnHit + 2);
		this.stancelOnPunish = Math.max(this.stancelOnPunish, this.stancelOnHit + 4);
		return this;
	}
	
	setStancelOnPunish(adv) {
		this.stancelOnPunish = adv;
		return this;
	}

	setStartup(start) {
		this.startup = start;
		return this;
	}

	setWhiffRecovery(whiff) {
		this.whiffRecovery = whiff;
		return this;
	}
}

export class FrameData {
	constructor(officialName, nickname, classicCommand, modernCommand,
				startup, active, recovery, whiffRecovery, hitstop,
				onHit, onBlock, onCounter, onPunish,
				onHitStance, onBlockStance, onCounterStance, onPunishStance,
				kdaOnHit, kdaOnCounter, kdaOnPunish,
				moveFlags, cancelFlags, attrFlags) {
		
		this.officialName = officialName;
		this.nickname = nickname;
		this.classicCommand = classicCommand;
		this.modernCommand = modernCommand;

		this.startup = startup;
		this.active = active;
		this.recovery = recovery;
		this.whiffRecovery = whiffRecovery;
		this.hitstop = hitstop;

		this.advOnHit = onHit;
		this.advOnBlock = onBlock;
		this.advOnCounter = onCounter;
		this.advOnPunish = onPunish;

		this.stancelOnHit = onHitStance;
		this.stancelOnBlock = onBlockStance;
		this.stancelOnCounter = onCounterStance;
		this.stancelOnPunish = onPunishStance;

		this.kdaOnHit = kdaOnHit;
		this.kdaOnCounter = kdaOnCounter;
		this.kdaOnPunish = kdaOnPunish;
		
		this.moveType = moveFlags;
		this.cancel = cancelFlags;
		this.flags = attrFlags;
	}

	totalFrames() {
		var result = this.startup + this.recovery + this.hitstop;
		this.active.forEach((num) => result += num);
		return result - 1;
	}

	whiffFrames() {
		var result = this.startup + this.recovery + this.whiffRecovery;
		this.active.forEach((num) => result += num);
		return result - 1;
	}
}


class FighterBuilder {
	constructor() {
		this.fighterName = "";
		this.dashFrames = 0;
		this.backdashFrames = 0;
		this.moves = [];
	}

	
	addAttack(attack) {
		this.moves.push(attack);
		return this;
	}

	build () {
		return new Fighter(this.fighterName, this.dashFrames, this.backdashFrames, this.moves);
	}

	setBackDash(frames) {
		this.backdashFrames = frames;
		return this;
	}

	setDash(frames) {
		this.dashFrames = frames;
		return this;
	}
	
	setName(name) {
		this.fighterName = name;
		return this;
	}
}

class Fighter {
	constructor(name, dash, backDash, attacks) {
		this.fighterName = name;
		this.dashFrames = dash;
		this.backdashFrames = backDash;
		this.moves = attacks;
	}
}

const allFighters = {
	aki: new FighterBuilder().setName("AKI").setDash(19).setBackDash(23).build(),
	aku: new FighterBuilder().setName("Akuma").setDash(19).setBackDash(23).build(),
	alx: new FighterBuilder().setName("Alex").setDash(22).setBackDash(25).build(),
	blk: new FighterBuilder().setName("Blanka").setDash(19).setBackDash(23).build(),
	bsn: new FighterBuilder().setName("Bison").setDash(19).setBackDash(23).build(),
	cmy: new FighterBuilder().setName("Cammy").setDash(18).setBackDash(23).build(),
	chu: new FighterBuilder().setName("Chun-Li").setDash(19).setBackDash(25)
			.addAttack(new FrameDataBuilder().setOfficialName("Stand LP").setNickname("Stand Jab").setClassicCommand("5LP").setStartup(4).setActive([3]).setRecovery(7).setAdvantageOnHit(5).setAdvantageOnBlock(-3).setStancelOnHit(-1).setStancelOnBlock(-8).setHitstop(9).setAttributeFlags(MoveAttributeFlags.CHAIN).setMoveType(MoveTypeFlags.NORMAL).setCancelType(CancelFlags.CHAIN | CancelFlags.SPECIAL_CANCEL | CancelFlags.SUPER_1_CANCEL | CancelFlags.SUPER_2_CANCEL | CancelFlags.SUPER_3_CANCEL | CancelFlags.STANCE_CANCEL).build())
			.addAttack(new FrameDataBuilder().setOfficialName("Stand MP").setNickname("Stand Strong").setClassicCommand("5MP").setStartup(5).setActive([4]).setRecovery(10).setAdvantageOnHit(6).setAdvantageOnBlock(1).setStancelOnHit(3).setStancelOnBlock(-1).setHitstop(11).setMoveType(MoveTypeFlags.NORMAL).setCancelType(CancelFlags.SPECIAL_CANCEL | CancelFlags.SUPER_1_CANCEL | CancelFlags.SUPER_2_CANCEL | CancelFlags.SUPER_3_CANCEL | CancelFlags.STANCE_CANCEL).build())
			.addAttack(new FrameDataBuilder().setOfficialName("Stand HP").setNickname("Stand Fierce").setClassicCommand("5HP").setStartup(13).setActive([3]).setRecovery(20).setAdvantageOnHit(2).setAdvantageOnBlock(-3).setStancelOnHit(6).setStancelOnBlock(1).setHitstop(13).setMoveFlags(MoveTypeFlags.NORMAL).setCancelType(CancelFlags.STANCE_CANCEL).build())
			.addAttack(new FrameDataBuilder().setOfficialName("Stand LK").setNickname("Stand Short").setClassicCommand("5LP").setStartup(5).setActive([3]).setRecovery(10).setAdvantageOnHit(2).setAdvantageOnBlock(-2).setStancelOnHit(0).setStancelOnBlock(-3).setHitstop(9).setMoveType(MoveTypeFlags.NORMAL).setCancelType(CancelFlags.SPECIAL_CANCEL | CancelFlags.SUPER_1_CANCEL | CancelFlags.SUPER_2_CANCEL | CancelFlags.SUPER_3_CANCEL | CancelFlags.STANCE_CANCEL).build())
			.addAttack(new FrameDataBuilder().setOfficialName("Stand MK").setNickname("Stand Forward").setClassicCommand("5MK").setStartup(7).setActive([4]).setRecovery(16).setAdvantageOnHit(4).setAdvantageOnBlock(-2).setStancelOnHit(9).setStancelOnBlock(4).setHitstop(11).setMoveType(MoveTypeFlags.NORMAL).setCancelType(CancelFlags.SPECIAL_CANCEL | CancelFlags.SUPER_1_CANCEL | CancelFlags.SUPER_2_CANCEL | CancelFlags.SUPER_3_CANCEL | CancelFlags.STANCE_CANCEL).build())
			.addAttack(new FrameDataBuilder().setOfficialName("Stand HK").setNickname("Stand Roundhouse").setClassicCommand("5HK").setStartup(14).setActive([3]).setRecovery(18).setAdvantageOnHit(4).setAdvantageOnBlock(0).setStancelOnHit(10).setStancelOnBlock(6).setHitstop(13).setMoveType(MoveTypeFlags.NORMAL).setCancelType(CancelFlags.STANCE_CANCEL).build())
			.addAttack(new FrameDataBuilder().setOfficialName("Crouch LP").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Crouch MP").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Crouch HP").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Crouch LK").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Crouch MK").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Crouch HK").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Jump LP").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Jump MP").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Jump HP").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Jump LK").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Jump MK").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Jump HK").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Neutral Jump HK").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Yoso Kick").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Soaring Eagle Punches").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Swift Thrust").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Hakkei").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Water Lotus Fist").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Yokusen Kick").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Falling Crane").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Orchid Palm").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Snake Strike").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Lotus Fist").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Forward Strike").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Senpu Kick").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Tenku Kick").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Koshuto").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Taiji Fan").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Ryuseiraku").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Hosen Kick").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Hoyoku Kick").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Taunt").build())
			.addAttack(new FrameDataBuilder().setOfficialName("LP Kikoken").build())
			.addAttack(new FrameDataBuilder().setOfficialName("MP Kikoken").build())
			.addAttack(new FrameDataBuilder().setOfficialName("HP Kikoken").build())
			.addAttack(new FrameDataBuilder().setOfficialName("OD Kikoken").build())
			.addAttack(new FrameDataBuilder().setOfficialName("LK Hundred Lightning Kicks").build())
			.addAttack(new FrameDataBuilder().setOfficialName("MK Hundred Lightning Kicks").build())
			.addAttack(new FrameDataBuilder().setOfficialName("HK Hundred Lightning Kicks").build())
			.addAttack(new FrameDataBuilder().setOfficialName("OD Hundred Lightning Kicks").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Lightning Kick Barrage").build())
			.addAttack(new FrameDataBuilder().setOfficialName("LK Aerial Hundred Lightning Kicks").build())
			.addAttack(new FrameDataBuilder().setOfficialName("MK Aerial Hundred Lightning Kicks").build())
			.addAttack(new FrameDataBuilder().setOfficialName("HK Aerial Hundred Lightning Kicks").build())
			.addAttack(new FrameDataBuilder().setOfficialName("OD Aerial Hundred Lightning Kicks").build())
			.addAttack(new FrameDataBuilder().setOfficialName("LK Spinning Bird Kick").build())
			.addAttack(new FrameDataBuilder().setOfficialName("MK Spinning Bird Kick").build())
			.addAttack(new FrameDataBuilder().setOfficialName("HK Spinning Bird Kick").build())
			.addAttack(new FrameDataBuilder().setOfficialName("OD Spinning Bird Kick").build())
			.addAttack(new FrameDataBuilder().setOfficialName("LK Hazanshu").build())
			.addAttack(new FrameDataBuilder().setOfficialName("MK Hazanshu").build())
			.addAttack(new FrameDataBuilder().setOfficialName("HK Hazanshu").build())
			.addAttack(new FrameDataBuilder().setOfficialName("OD Hazanshu").build())
			.addAttack(new FrameDataBuilder().setOfficialName("LK Tenshokyaku").build())
			.addAttack(new FrameDataBuilder().setOfficialName("MK Tenshokyaku").build())
			.addAttack(new FrameDataBuilder().setOfficialName("HK Tenshokyaku").build())
			.addAttack(new FrameDataBuilder().setOfficialName("OD Tenshokyaku").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Kikosho").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Aerial Kikosho").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Hoyoku-sen").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Soten Ranka").build())
			.addAttack(new FrameDataBuilder().setOfficialName("Critical Art").build())
			.build(),
	djy: new FighterBuilder().setName("Dee Jay").setDash(19).setBackDash(23).build(),
	dsm: new FighterBuilder().setName("Dhalsim").setDash(25).setBackDash(23).build(),
	ed: new FighterBuilder().setName("Ed").setDash(19).setBackDash(23).build(),
	eln: new FighterBuilder().setName("Elena").setDash(20).setBackDash(23).build(),
	gui: new FighterBuilder().setName("Guile").setDash(21).setBackDash(23).build(),
	hnd: new FighterBuilder().setName("Honda").setDash(19).setBackDash(23).build(),
	jam: new FighterBuilder().setName("Jamie").setDash(19).setBackDash(23).build(),
	jp: new FighterBuilder().setName("JP").setDash(22).setBackDash(23).build(),
	jur: new FighterBuilder().setName("Juri").setDash(22).setBackDash(23).build(),
	ken: new FighterBuilder().setName("Ken").setDash(19).setBackDash(23).build(),
	kim: new FighterBuilder().setName("Kimberly").setDash(18).setBackDash(23).build(),
	lil: new FighterBuilder().setName("Lily").setDash(21).setBackDash(24).build(),
	luk: new FighterBuilder().setName("Luke").setDash(19).setBackDash(23).build(),
	mai: new FighterBuilder().setName("Mai").setDash(18).setBackDash(23).build(),
	man: new FighterBuilder().setName("Manon").setDash(21).setBackDash(25).build(),
	mrs: new FighterBuilder().setName("Marisa").setDash(22).setBackDash(25).build(),
	rsd: new FighterBuilder().setName("Rashid").setDash(18).setBackDash(25).build(),
	ryu: new FighterBuilder().setName("Ryu").setDash(19).setBackDash(23).build(),
	sgt: new FighterBuilder().setName("Sagat").setDash(23).setBackDash(23).build(),
	ter: new FighterBuilder().setName("Terry").setDash(19).setBackDash(23).build(),
	vpr: new FighterBuilder().setName("Viper").setDash(21).setBackDash(23).build(),
	zgf: new FighterBuilder().setName("Zangief").setDash(22).setBackDash(25).build()
}