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

        this.moveType = MoveTypeFlags.NORMAL;
        this.cancel = CancelFlags.NONE;
        this.flags = MoveAttributeFlags.NONE;
    }

    build() {
        return new FrameData(this.officialName, this.nickname, this.classicCommand, this.modernCommand,
                                this.startup, this.active, this.recovery, this.whiffRecovery, this.hitstop,
                                this.advOnHit, this.advOnBlock, this.advOnCounter, this.advOnPunish,
                                this.moveType, this.cancelFlags);
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
    constructor(officialName, nickname, classicCommand, modernCommand, startup, active, recovery, whiffRecovery, hitstop, onHit, onBlock, onCounter, onPunish, moveFlags, cancelFlags) {
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

        this.moveType = moveFlags;
        this.cancel = cancelFlags;
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