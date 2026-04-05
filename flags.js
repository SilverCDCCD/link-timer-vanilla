export const CancelFlags = {
	NONE: 0,
	CHAIN: 1,
	SPECIAL_CANCEL: 2,
	SUPER_1_CANCEL: 4,
	SUPER_2_CANCEL: 8,
	SUPER_3_CANCEL: 16,
	STANCE_CANCEL: 32,
	JUMP_CANCEL: 64,
	TARGET_COMBO: 128
};

export const MoveTypeFlags = {
	NORMAL: 1,
	SPECIAL: 2,
	LEVEL_1_SUPER: 12,
	LEVEL_2_SUPER: 20,
	LEVEL_3_SUPER: 36,
	STANCE: 64,
	SYSTEM_MECHANIC: 128
};

export const MoveAttributeFlags = {
	NONE: 0,
	KNOCKS_DOWN_ON_HIT: 1
}