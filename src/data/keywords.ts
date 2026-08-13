import type { Rule } from '../types'

export interface KeywordEntry {
  name: string
  definition: Rule
}

export const KEYWORDS: KeywordEntry[] = [
  {
    name: 'ACCESS POINT',
    definition: {
      en: 'Part of a Terrain that connects different elevation levels. Models moving through an ACCESS POINT can change their elevation.',
      ko: '서로 다른 고도 단계를 연결하는 지형 요소. 모델이 ACCESS POINT를 통과해서 이동하면 고도를 바꿀 수 있다.',
    },
  },
  {
    name: 'ACTIVE PLAYER',
    definition: {
      en: 'The player whose turn it is to act.',
      ko: '지금 행동할 차례인 플레이어.',
    },
  },
  {
    name: 'ANTI-EVADE (X)',
    definition: {
      en: 'When resolving an attack with this weapon against Enemy Units, the target Unit suffers a -X Modifier to its Evade Roll for this attack (Part 8.7.4, Step 4).',
      ko: '이 무기로 적 유닛을 공격할 때, 대상 유닛은 이 공격에 대한 Evade Roll에 -X 수정치를 받는다 (Part 8.7.4, Step 4).',
    },
  },
  {
    name: 'ARMY SLOT',
    definition: {
      en: 'Army Slots determine how many and what types of Units may be included in an army. Each Army Slot has a specific type: Core, Elite, Support, Air, or Hero. Every Unit occupies a number of Army Slots of its designated type equal to its starting Supply Value.\nThe Faction Card provides the initial pool of Army Slots. Additional Army Slots are unlocked by purchasing Tactical Cards with Vespene Gas during Army Building (Part 9.1.5). Unused Army Slots are lost - they cannot be converted, exchanged, or carried forward.',
      ko: 'Army Slot은 부대에 포함할 수 있는 유닛의 수와 종류를 결정한다. 각 Army Slot에는 Core, Elite, Support, Air, Hero 중 하나의 특정 타입이 있다. 모든 유닛은 자신의 시작 Supply Value만큼 해당 타입의 Army Slot을 차지한다.\nFaction Card는 최초의 Army Slot 풀을 제공한다. 추가 Army Slot은 Army Building 중 가스로 Tactical Card를 구매해서 잠금 해제한다 (Part 9.1.5). 사용하지 않은 Army Slot은 사라진다 - 전환하거나 교환하거나 이월할 수 없다.',
    },
  },
  {
    name: 'AVAILABLE SUPPLY',
    definition: {
      en: 'Available Supply is the remaining Supply capacity available for new deployments. It equals the current Supply Pool minus the Total Current Supply Value of all Friendly Units on the battlefield (Part 8.3.2).\nA Unit may only be deployed from Reserves if its Current Supply Value is less than or equal to the Available Supply. At no point may the Total Current Supply of a player\'s on-table Units exceed the Supply Pool. Units Destroyed or reduced by casualties free up Available Supply for new arrivals. In the final Round of the game, the Supply Pool becomes unlimited, and the Available Supply restrictions are lifted.',
      ko: 'Available Supply는 새로 배치할 수 있는 남은 Supply 여유분이다. 현재 Supply Pool에서 전장에 있는 모든 아군 유닛의 Total Current Supply Value를 뺀 값과 같다 (Part 8.3.2).\n유닛은 자신의 Current Supply Value가 Available Supply 이하일 때만 Reserves에서 배치될 수 있다. 어떤 시점에도 한 플레이어의 전장 위 유닛들의 Total Current Supply는 Supply Pool을 넘을 수 없다. 유닛이 Destroyed되거나 피해로 줄어들면 그만큼 Available Supply가 확보되어 새로운 배치에 쓸 수 있다. 게임의 마지막 라운드에는 Supply Pool이 무제한이 되며 Available Supply 제한이 사라진다.',
    },
  },
  {
    name: 'BLOCKING TERRAIN',
    definition: {
      en: 'Any terrain piece with an Effective Size of 1 or greater. Blocking Terrain obstructs Line of Sight according to the Cover rules (Part 7.1.1). Whether a model may move through that terrain is determined separately by the movement rules, terrain Size, ACCESS POINTS, Gap Clearance, and any relevant terrain keywords.',
      ko: 'Effective Size가 1 이상인 모든 지형물. Blocking Terrain은 Cover 규칙(Part 7.1.1)에 따라 Line of Sight를 막는다. 모델이 그 지형을 통과해 이동할 수 있는지는 이동 규칙, 지형의 Size, ACCESS POINT, Gap Clearance, 그리고 관련 지형 키워드에 따라 별도로 결정된다.',
    },
  },
  {
    name: 'BUFF [Characteristic] (X)',
    definition: {
      en: 'The Unit gains a bonus of X to the specified characteristic until the End of the Round.\n• Target Number characteristic (e.g. Armour, Hit): reduce the value by X (easier to roll).\n• Value characteristic (e.g. Speed, RoA): increase the value by X.',
      ko: '그 유닛은 라운드 종료 시까지 지정된 특성치에 X만큼의 보너스를 얻는다.\n• 목표 수치형 특성치(예: Armour, Hit): 수치를 X만큼 낮춘다 (굴리기 쉬워짐).\n• 수치형 특성치(예: Speed, RoA): 수치를 X만큼 올린다.',
    },
  },
  {
    name: 'BULKY',
    definition: {
      en: 'This weapon cannot be used to make a Ranged Attack while the Unit is currently Engaged (Part 8.7.3).',
      ko: '이 유닛이 Engaged 상태인 동안에는 이 무기로 Ranged Attack을 할 수 없다 (Part 8.7.3).',
    },
  },
  {
    name: 'BURROWED',
    definition: {
      en: '• BURROWED is classified as a Status.\n• A BURROWED Unit has the HIDDEN Status.\n• Its Size is treated as 0 for all purposes\n• Its Current Supply Value is treated as 0 for Disengage checks.\n• A BURROWED Unit cannot Control or Contest Mission Markers (overrides Parts 6.2 and 8.9.1).\n• While BURROWED, the Unit may only perform Deploy, Move, Disengage, Run, Hold and Close Ranks actions. Performing any of these (except Hold) immediately removes the BURROWED status.\n• BURROWED Units may use Special Abilities unless stated otherwise.\n• BURROWED Units may make an Evade Roll against every attack targeting them.\n• Other models may move through a BURROWED Unit\'s models, provided they do not end Within the Engagement Range of the BURROWED Unit (overrides Part 8.5.3).\n• If a BURROWED Unit is Engaged at the start of the Combat Phase, it must be Activated but cannot perform a Close Combat Attack in its BURROWED state. The Unit may perform Close Ranks as its first step, which immediately removes the BURROWED status. Once the status is removed, the Unit completes the remaining steps of the Close Combat Attack normally. If the Unit does not or cannot perform Close Ranks, it does not attack. Enemy Units Engaged with a BURROWED Unit may attack it as normal regardless of its status.',
      ko: '• BURROWED는 Status로 분류된다.\n• BURROWED 상태인 유닛은 HIDDEN Status를 함께 가진다.\n• Size는 모든 목적에서 0으로 취급한다.\n• Current Supply Value는 Disengage 판정에서 0으로 취급한다.\n• BURROWED 유닛은 Mission Marker를 Control하거나 Contest할 수 없다 (Part 6.2, 8.9.1을 무시한다).\n• BURROWED 상태인 동안 그 유닛은 Deploy, Move, Disengage, Run, Hold, Close Ranks 행동만 수행할 수 있다. Hold를 제외한 이 행동들을 수행하면 즉시 BURROWED 상태가 사라진다.\n• BURROWED 유닛도 별도 명시가 없는 한 Special Ability를 사용할 수 있다.\n• BURROWED 유닛은 자신을 대상으로 하는 모든 공격에 대해 Evade Roll을 할 수 있다.\n• 다른 모델은 BURROWED 유닛의 모델을 통과해 이동할 수 있다. 단, BURROWED 유닛의 Engagement Range 이내에서 이동을 마칠 수는 없다 (Part 8.5.3을 무시한다).\n• BURROWED 유닛이 Combat Phase 시작 시 Engaged 상태라면 반드시 Activated되어야 하지만, BURROWED 상태로는 Close Combat Attack을 할 수 없다. 그 유닛은 첫 단계로 Close Ranks를 수행할 수 있으며, 이는 즉시 BURROWED 상태를 제거한다. 상태가 제거되면 그 유닛은 Close Combat Attack의 남은 단계를 정상적으로 진행한다. Close Ranks를 수행하지 않거나 할 수 없다면 공격하지 않는다. BURROWED 유닛과 Engaged 상태인 적 유닛은 그 상태와 무관하게 평소처럼 공격할 수 있다.',
    },
  },
  {
    name: 'BURST FIRE Y" (X)',
    definition: {
      en: 'When making a Ranged Attack against a target Within Y" of the attacking model, increase this weapon\'s RoA by X for that attack.',
      ko: '공격 모델로부터 Y" 이내의 대상에게 Ranged Attack을 할 때, 그 공격에 한해 이 무기의 RoA를 X만큼 늘린다.',
    },
  },
  {
    name: 'COMBAT TAGS',
    definition: {
      en: 'Combat Tags are keywords printed on a Unit Card that identify a Unit\'s physical nature and tactical class.\nType Tags: Armoured, Biological, Light, Mechanical, Psionic, Flying, and Ground.\n• Targeting: Some weapons can fire only at specific Combat Tags (e.g., "Target: Flying").\n• Surge: A weapon\'s Surge efficiency triggers only when the target has the Combat Tag listed in the weapon\'s Surge Type (Part 8.7.4).\n• Bonuses: Abilities such as ANTI-EVADE (X) or PIERCE (X) often apply only against specific Combat Tags.\nNote: The Ground Combat Tag and the GROUND LEVEL elevation (Part 8.5.3) are distinct concepts. A Flying Unit standing on the playmat is at GROUND LEVEL but does not have the Ground Combat Tag. Throughout these rules, Ground in bold always refers to the Combat Tag. GROUND LEVEL always refers to elevation.',
      ko: 'Combat Tag는 Unit Card에 표기되어 그 유닛의 물리적 특성과 전술적 분류를 나타내는 키워드다.\nType Tag: Armoured, Biological, Light, Mechanical, Psionic, Flying, Ground.\n• Targeting: 일부 무기는 특정 Combat Tag만 노릴 수 있다 (예: "Target: Flying").\n• Surge: 무기의 Surge 효율은 대상이 그 무기의 Surge Type에 적힌 Combat Tag를 가지고 있을 때만 발동한다 (Part 8.7.4).\n• 보너스: ANTI-EVADE (X)나 PIERCE (X) 같은 능력은 종종 특정 Combat Tag를 가진 대상에게만 적용된다.\n참고: Ground Combat Tag와 GROUND LEVEL 고도(Part 8.5.3)는 서로 다른 개념이다. 매트 위에 서 있는 Flying 유닛은 GROUND LEVEL에 있지만 Ground Combat Tag는 가지고 있지 않다. 이 규칙 전반에서 굵게 표시된 Ground는 항상 Combat Tag를 가리키며, GROUND LEVEL은 항상 고도를 가리킨다.',
    },
  },
  {
    name: 'CONCENTRATED FIRE (X)',
    definition: {
      en: 'Attacks with this weapon may remove no more than X models as casualties. Once X models have been removed, discard any remaining Total Damage. It is not recorded as a Damage Marker and does not carry over.',
      ko: '이 무기로 하는 공격은 최대 X개의 모델까지만 casualty(전사 모델)로 제거할 수 있다. X개의 모델이 제거되고 나면 남은 Total Damage는 모두 버린다. 그 남은 값은 Damage Marker로 기록되지 않으며 다음으로 이월되지도 않는다.',
    },
  },
  {
    name: 'CONTROLLING PLAYER',
    definition: {
      en: 'The player who commands a specific Unit, model, or Token. They make all decisions and roll all dice. Certain abilities (e.g., Neural Parasite) can transfer control; the new controller then acts in every respect as though the Unit were their own.',
      ko: '특정 유닛, 모델, 또는 토큰을 지휘하는 플레이어. 그 플레이어가 모든 결정을 내리고 모든 주사위를 굴린다. 일부 능력(예: Neural Parasite)은 지휘권을 넘길 수 있으며, 이 경우 새로운 소유 플레이어는 그 유닛을 자신의 것처럼 다룬다.',
    },
  },
  {
    name: 'CRITICAL HIT (X)',
    definition: {
      en: 'Move X dice from the Armour Pool directly to the Damage Pool, bypassing Armour. CRITICAL HIT can never move more dice than are in the Armour Pool.',
      ko: 'Armour Pool에 있는 주사위 중 X개를 Armour를 거치지 않고 곧바로 Damage Pool로 옮긴다. CRITICAL HIT은 Armour Pool에 있는 주사위 개수보다 더 많이 옮길 수 없다.',
    },
  },
  {
    name: 'CURRENT SUPPLY VALUE',
    definition: {
      en: 'The Current Supply Value of a Unit is its Supply Value at this moment, based on the number of models remaining in the Unit as shown on the Supply Profile (Part 6.1). Update the Current Supply Value immediately whenever a casualty reduces the model count into a lower bracket.\nThe Current Supply Value is referenced when checking whether a Unit may be deployed from Reserves (Part 8.3.2), when determining Mission Marker Control (Part 8.9.1), when evaluating Tactical Mass for Disengage (Part 8.5.4), and when calculating Victory Points for Supply-based scoring conditions.',
      ko: '유닛의 Current Supply Value는 그 시점에서의 Supply Value로, Supply Profile(Part 6.1)에 표시된 대로 유닛에 남아 있는 모델 수를 기준으로 한다. casualty로 모델 수가 더 낮은 구간으로 줄어들면 즉시 Current Supply Value를 갱신한다.\nCurrent Supply Value는 유닛이 Reserves에서 배치될 수 있는지 확인할 때(Part 8.3.2), Mission Marker의 Control을 판정할 때(Part 8.9.1), Disengage를 위한 Tactical Mass를 평가할 때(Part 8.5.4), 그리고 Supply 기반 채점 조건의 승점을 계산할 때 참조된다.',
    },
  },
  {
    name: 'DEBUFF [Characteristic] (X)',
    definition: {
      en: 'The Unit suffers a penalty of X to the specified characteristic until the End of the Round.\n• Target Number characteristic: increase the value by X (harder to roll).\n• Value characteristic: decrease the value by X (minimum 0).',
      ko: '그 유닛은 라운드 종료 시까지 지정된 특성치에 X만큼의 페널티를 받는다.\n• 목표 수치형 특성치: 수치를 X만큼 올린다 (굴리기 어려워짐).\n• 수치형 특성치: 수치를 X만큼 내린다 (최소 0).',
    },
  },
  {
    name: 'DISPLACEMENT',
    definition: {
      en: 'The Leading Model may end a move overlapping this Token or Unit (overrides Part 7.3.1).\nIf the Leading Model ends any Move, Deploy, Run, Charge, Disengage, Close Ranks or Special Ability move overlapping this Token or model, the controlling player of the Leading Model immediately sets it in Base-to-Base contact with the Leading Model. If Base-to-Base is not possible, set it as close as possible.',
      ko: 'Leading Model은 이 토큰이나 유닛과 겹친 채로 이동을 마칠 수 있다 (Part 7.3.1을 무시한다).\nLeading Model이 Move, Deploy, Run, Charge, Disengage, Close Ranks, 또는 Special Ability로 인한 이동을 이 토큰이나 모델과 겹친 채로 마치면, Leading Model의 소유 플레이어는 즉시 그것을 Leading Model과 베이스가 맞닿도록 옮긴다. 베이스를 맞대는 것이 불가능하다면 가능한 한 가깝게 놓는다.',
    },
  },
  {
    name: 'DODGE (X)',
    definition: {
      en: 'When this Unit is targeted by an attack, reduce the number of dice moved from the Armour Pool to the Damage Pool by Surge or CRITICAL HIT by X (minimum 0). Apply during the Resolve Surge step.',
      ko: '이 유닛이 공격의 대상이 되었을 때, Surge나 CRITICAL HIT으로 Armour Pool에서 Damage Pool로 옮겨지는 주사위 수를 X만큼 줄인다 (최소 0). 이는 Resolve Surge 단계에서 적용한다.',
    },
  },
  {
    name: 'EFFECTIVE SIZE',
    definition: {
      en: "A model's Effective Size is equal to its Size characteristic plus the Size of any terrain it is standing on (Part 7.1.2).\nA model at GROUND LEVEL has an Effective Size equal to its own Size characteristic only. A model on HIGH GROUND (Size 3+) or MID GROUND (Size 1–2) adds the terrain's Size to its own. Terrain pieces set on elevated surfaces stack in the same way- a terrain piece's Effective Size equals its own Size plus the Size of the terrain it stands on.\nEffective Size determines which terrain blocks Line of Sight through Full Cover and Direct Cover (Part 7.1.1). Flying models are treated as having an Effective Size higher than any terrain piece on the table for Cover purposes (Part 7.1.4).",
      ko: '모델의 Effective Size는 자신의 Size 특성치에, 자신이 올라서 있는 지형의 Size를 더한 값이다 (Part 7.1.2).\nGROUND LEVEL에 있는 모델의 Effective Size는 자신의 Size 특성치와 같다. HIGH GROUND(Size 3 이상)나 MID GROUND(Size 1~2)에 있는 모델은 지형의 Size를 자신의 것에 더한다. 높은 곳에 놓인 지형물도 같은 방식으로 쌓인다 - 한 지형물의 Effective Size는 자신의 Size에, 그 지형물이 올라서 있는 지형의 Size를 더한 값이다.\nEffective Size는 Full Cover와 Direct Cover를 통해 어떤 지형이 Line of Sight를 막는지를 결정한다 (Part 7.1.1). Flying 모델은 Cover 판정에서 테이블 위 어떤 지형물보다도 Effective Size가 높은 것으로 취급한다 (Part 7.1.4).',
    },
  },
  {
    name: 'ELEVATION LEVEL',
    definition: {
      en: 'Models can stand one of three elevations:\n• GROUND LEVEL: Standing directly on the playmat.\n• MID GROUND: Standing on horizontal terrain of Size 1 or 2.\n• HIGH GROUND: Standing on horizontal terrain of Size 3 or larger.\nThe model stands on Elevation if its base is at that elevation. If the model\'s base is on multiple elevation levels, assume it is standing on the highest of those elevations.',
      ko: '모델은 다음 세 가지 고도 중 하나에 서 있을 수 있다:\n• GROUND LEVEL: 플레이매트 위에 직접 서 있는 상태.\n• MID GROUND: Size 1 또는 2인 수평 지형 위에 서 있는 상태.\n• HIGH GROUND: Size 3 이상인 수평 지형 위에 서 있는 상태.\n모델의 베이스가 어느 고도에 있으면 그 모델은 그 고도에 서 있는 것으로 본다. 모델의 베이스가 여러 고도에 걸쳐 있다면 그중 가장 높은 고도에 서 있는 것으로 취급한다.',
    },
  },
  {
    name: 'ENEMY',
    definition: {
      en: 'All Units, Tokens, and cards belonging to the opponent are Enemies. In team games, all opposing players\' Units, Tokens, and cards are Enemies. A Unit may never target a Friendly Unit with an attack unless a rule explicitly states otherwise. Enemy is the opposite of Friendly and is referenced throughout the rules to determine valid targets, Engagement, and Mission Marker contests.',
      ko: '상대방에게 속한 모든 유닛, 토큰, 카드는 Enemy(적)이다. 팀전에서는 상대 팀 모든 플레이어의 유닛, 토큰, 카드가 Enemy다. 규칙에서 명시적으로 허용하지 않는 한, 유닛은 아군 유닛을 공격 대상으로 지정할 수 없다. Enemy는 Friendly(아군)의 반대 개념이며, 유효한 대상 판정, Engagement, Mission Marker 쟁탈 등 규칙 전반에서 참조된다.',
    },
  },
  {
    name: 'ENGAGED',
    definition: {
      en: 'A Ground Unit is Engaged when any of its models is Within 1" (Engagement Range) of any model in an Enemy Ground Unit, provided the following conditions are met (Part 7.2.1):\n• Combat Tags match: Ground models Engage only Ground models. Flying models cannot be Engaged by any model.\n• Terrain does not block: Size 2+ terrain between the models prevents Engagement, even if they are Within 1". Models on HIGH GROUND cannot Engage models at GROUND LEVEL, and vice versa.\nWhen any model in a Unit is Engaged, the entire Unit is considered Engaged. An Engaged Unit cannot perform a standard Move - it must Disengage (Part 8.5.4) or Hold. Engaged Units are also subject to restrictions on Ranged Attacks (Part 8.7.3).',
      ko: '지상 유닛은 자신의 모델 중 하나라도 적 지상 유닛의 모델과 1"(Engagement Range) 이내에 있고, 다음 조건을 모두 만족하면 Engaged 상태가 된다 (Part 7.2.1):\n• Combat Tag 일치: 지상 모델은 지상 모델끼리만 Engage한다. Flying 모델은 어떤 모델과도 Engage될 수 없다.\n• 지형이 막지 않을 것: 모델 사이에 Size 2 이상의 지형이 있으면 1" 이내라도 Engagement가 성립하지 않는다. HIGH GROUND에 있는 모델은 GROUND LEVEL에 있는 모델과 Engage할 수 없으며, 그 반대도 마찬가지다.\n유닛 안의 모델 하나라도 Engaged 상태가 되면 그 유닛 전체가 Engaged로 취급된다. Engaged 유닛은 일반 Move를 할 수 없으며 Disengage(Part 8.5.4)하거나 Hold해야 한다. Engaged 유닛은 Ranged Attack에도 제한을 받는다 (Part 8.7.3).',
    },
  },
  {
    name: 'ENGAGEMENT RANGE',
    definition: {
      en: 'The Engagement Range extends 1" horizontally from any model\'s base. When two Enemy Ground models are Within each other\'s Engagement Range, they are Engaged (Part 7.2).\nEngagement Range is measured horizontally from a top-down perspective, ignoring vertical height (Part 4.1). It is referenced when resolving Move restrictions (Part 8.5.3), Disengage (Part 8.5.4), Charge (Part 8.6.2), the Fighting Rank (Part 8.8.1), and PLACE effects. Melee weapons list E as their Range, indicating they may only strike targets Within the Engagement Range.',
      ko: 'Engagement Range는 모델의 베이스로부터 수평으로 1" 뻗어 있는 범위다. 서로 적인 두 지상 모델이 서로의 Engagement Range 안에 들어오면 Engaged 상태가 된다 (Part 7.2).\nEngagement Range는 위에서 내려다본 수평 시점으로 측정하며 높이는 고려하지 않는다 (Part 4.1). 이는 Move 제한(Part 8.5.3), Disengage(Part 8.5.4), Charge(Part 8.6.2), Fighting Rank(Part 8.8.1), PLACE 효과를 처리할 때 참조된다. 근접 무기는 Range를 E로 표기하며, 이는 Engagement Range 이내의 대상만 공격할 수 있다는 뜻이다.',
    },
  },
  {
    name: 'ENTRY EDGE',
    definition: {
      en: 'The table edge assigned to a player by the Deployment Card. Units enter the battlefield from this edge when deploying from Reserves.',
      ko: 'Deployment Card로 각 플레이어에게 배정된 테이블 가장자리. 유닛이 Reserves에서 배치될 때 이 가장자리를 통해 전장에 들어온다.',
    },
  },
  {
    name: 'FACTION TAGS',
    definition: {
      en: 'Faction Tags are keywords printed on Unit Cards, Tactical Cards, and Faction Cards that identify allegiance.\n• Race Tags: Terran, Zerg, Protoss.\n• Sub-Faction Tags: Specific broods or organisations, e.g., Kerrigan\'s Swarm, Raynor\'s Raiders.\n• Function: During Army Building, a player may include only Units and Tactical Cards whose Faction Tags all appear on the chosen Faction Card. If even one tag on the Unit or Tactical Card does not appear on the Faction Card, that card cannot be included. A Unit with fewer tags than the Faction Card is permitted- it only requires its own tags to be present (Part 9.1.2).',
      ko: 'Faction Tag는 Unit Card, Tactical Card, Faction Card에 표기되어 소속을 나타내는 키워드다.\n• Race Tag: Terran, Zerg, Protoss.\n• Sub-Faction Tag: Kerrigan\'s Swarm, Raynor\'s Raiders처럼 특정 무리나 조직을 나타낸다.\n• 기능: Army Building 중에는 자신의 Faction Tag가 모두 선택한 Faction Card에 있는 유닛과 Tactical Card만 포함할 수 있다. 유닛이나 Tactical Card의 태그 중 단 하나라도 Faction Card에 없다면 그 카드는 포함할 수 없다. Faction Card보다 태그 수가 적은 유닛은 포함 가능하다 - 자신이 가진 태그만 Faction Card에 있으면 된다 (Part 9.1.2).',
    },
  },
  {
    name: 'FIGHTING RANK',
    definition: {
      en: 'A model is in the Fighting Rank if it is Within the Engagement Range (1") of an Enemy model. Models in the Fighting Rank may strike with their Combat Phase weapons. See Part 8.8.1, Step 2.',
      ko: '모델은 적 모델의 Engagement Range(1") 이내에 있으면 Fighting Rank에 속한다. Fighting Rank에 있는 모델은 자신의 Combat Phase 무기로 공격할 수 있다. Part 8.8.1, Step 2 참고.',
    },
  },
  {
    name: 'FIRST PLAYER MARKER',
    definition: {
      en: 'A physical Token used to track which player has initiative. At the start of the game, the winner of the Roll-Off (Part 3.2) assigns the First Player Marker to either player for Round 1. The holder of the First Player Marker chooses which player activates first at the start of each Phase. The Marker changes hands in two ways: the first player to Pass during Phase 1 or Phase 2 takes the First Player Marker for the following Phase, and at the end of Phase 4 the Marker is awarded to the player with fewer Victory Points (Part 8.9.6). If Victory Points are tied, both players Roll-Off and the winner takes the Marker.',
      ko: '어느 플레이어가 선공권을 가지는지 표시하는 실물 토큰. 게임 시작 시, Roll-Off(Part 3.2)의 승자가 Round 1의 First Player Marker를 둘 중 한 플레이어에게 배정한다. First Player Marker를 가진 플레이어가 각 Phase 시작 시 어느 플레이어가 먼저 Activate할지 정한다. 이 Marker는 두 가지 방식으로 넘어간다: Phase 1이나 Phase 2에서 먼저 Pass한 플레이어가 다음 Phase의 First Player Marker를 가져가며, Phase 4가 끝나면 승점이 더 적은 플레이어에게 Marker가 넘어간다 (Part 8.9.6). 승점이 같다면 두 플레이어가 Roll-Off를 해서 승자가 Marker를 가져간다.',
    },
  },
  {
    name: 'FLYING',
    definition: {
      en: "Flying Units trade board control (no Mission Markers, no melee) for mobility and immunity to terrain.\n• A Flying Unit ignores all terrain for movement purposes. The Leading Model moves point-to-point, measuring horizontally. Other models may pass through a Flying model's base as if it were not there, and vice versa.\n• A Flying Unit is never Engaged. Ground models cannot Engage Flying models, and Flying models cannot Engage other Flying models. A Flying Unit must end its movement at least 1\" away from all Enemy Flying Units.\n• Flying model, ignore the Full Cover rule. Direct Cover and the Elevation Dead Zone rules still apply. Assume that Flying Units' Effective Size is higher than the Effective Size of any terrain piece on the table.\n• A Flying Unit does not benefit from HIGH GROUND Cover (Part 7.1.3).\n• A Flying Unit cannot Control or Contest Mission Markers (overrides Parts 6.2 and 8.9.1).\n• A Flying Unit cannot Charge or be Charged.\n• A Flying Unit cannot participate in the Combat Phase (Part 8.8).\n• A Flying Unit ignores elevation. It does not use Access Points. For Cover and Line of Sight purposes, treat a Flying unit's Effective Size as higher than the Effective Size of any terrain piece on the table (Part 7.1.4). Terrain does not contribute to a Flying model's Effective Size.\n• A Flying Unit moving over Grass does not destroy the Grass terrain piece. If a Flying Unit ends on a Grass terrain piece, it is removed as normal.",
      ko: '• Flying 유닛은 기동성과 지형 면역을 얻는 대신 전장 장악력(Mission Marker 확보 불가, 근접전 불가)을 포기한다.\n• Flying 유닛은 이동 시 모든 지형을 무시한다. Leading Model은 지점에서 지점으로 수평으로 측정하며 이동한다. 다른 모델은 Flying 모델의 베이스를 마치 없는 것처럼 통과할 수 있고, 그 반대도 마찬가지다.\n• Flying 유닛은 절대 Engaged 상태가 되지 않는다. 지상 모델은 Flying 모델과 Engage할 수 없고, Flying 모델끼리도 서로 Engage할 수 없다. Flying 유닛은 모든 적 Flying 유닛으로부터 최소 1" 떨어진 곳에서 이동을 마쳐야 한다.\n• Flying 모델은 Full Cover 규칙을 무시한다. Direct Cover와 Elevation Dead Zone 규칙은 그대로 적용된다. Flying 유닛의 Effective Size는 테이블 위 어떤 지형물보다도 높은 것으로 취급한다.\n• Flying 유닛은 HIGH GROUND의 Cover 효과를 받지 않는다 (Part 7.1.3).\n• Flying 유닛은 Mission Marker를 Control하거나 Contest할 수 없다 (Part 6.2, 8.9.1을 무시한다).\n• Flying 유닛은 Charge할 수도, Charge당할 수도 없다.\n• Flying 유닛은 Combat Phase에 참여할 수 없다 (Part 8.8).\n• Flying 유닛은 고도를 무시한다. Access Point를 사용하지 않는다. Cover와 Line of Sight 판정에서 Flying 유닛의 Effective Size는 테이블 위 어떤 지형물보다도 높은 것으로 취급한다 (Part 7.1.4). 지형은 Flying 모델의 Effective Size에 영향을 주지 않는다.\n• Flying 유닛이 Grass 위로 지나가도 그 Grass 지형물은 파괴되지 않는다. Flying 유닛이 Grass 지형물 위에서 이동을 마치면 평소처럼 제거된다.',
    },
  },
  {
    name: 'FRIENDLY',
    definition: {
      en: "All Units, Tokens, and cards belonging to the Controlling Player are Friendly to one another. In team games, all teammates' Units, Tokens, and cards are also Friendly. A Unit's own models are always Friendly to it. Friendly is the opposite of Enemy and is used throughout the rules to determine targeting restrictions, movement interactions, and ability eligibility.",
      ko: '같은 소유 플레이어에게 속한 모든 유닛, 토큰, 카드는 서로 Friendly(아군)다. 팀전에서는 팀원의 모든 유닛, 토큰, 카드도 Friendly다. 유닛 자신의 모델들은 언제나 그 유닛에게 Friendly다. Friendly는 Enemy의 반대 개념이며, 대상 지정 제한, 이동 상호작용, 능력 사용 조건 등 규칙 전반에서 쓰인다.',
    },
  },
  {
    name: 'GRASS',
    definition: {
      en: "A terrain piece with a Size of 2 that follows special rules. Unlike other Size 2 terrain, Grass does not block movement but does block Line of Sight, following the standard Cover rules (Part 7.1.1).\nGrass is destroyed by the passage of war. If a Leading Model's path of travel passes through or any model of a Unit ends on a Grass terrain piece during any movement action (Move, Deploy, Run, Charge, Disengage or Close Ranks), that Grass terrain piece is immediately removed from the game. It does not return during Cleanup & Refresh and cannot be replaced by any means.\nA Flying Unit moving over Grass does not destroy the Grass terrain piece. Flying models pass above the terrain, not through it. If any model of a Flying Unit ends on a Grass terrain piece, it is removed as normal.",
      ko: 'Size 2이면서 특수 규칙을 따르는 지형물. 다른 Size 2 지형과 달리 Grass는 이동을 막지 않지만, 표준 Cover 규칙(Part 7.1.1)에 따라 Line of Sight는 막는다.\nGrass는 전투가 지나가면 파괴된다. Leading Model의 이동 경로가 Grass 지형물을 통과하거나, 어떤 이동 행동(Move, Deploy, Run, Charge, Disengage, Close Ranks) 중에 유닛의 모델이 Grass 지형물 위에서 이동을 마치면, 그 Grass 지형물은 즉시 게임에서 제거된다. Cleanup & Refresh 때도 되돌아오지 않으며 어떤 방법으로도 다시 놓을 수 없다.\nFlying 유닛이 Grass 위로 지나가는 것만으로는 그 Grass 지형물이 파괴되지 않는다. Flying 모델은 지형을 통과하는 게 아니라 그 위를 지나가는 것으로 취급한다. Flying 유닛의 모델이 Grass 지형물 위에서 이동을 마치면 평소처럼 제거된다.',
    },
  },
  {
    name: 'GROUND LEVEL',
    definition: {
      en: 'One of the elevation levels. Model is on the GROUND LEVEL when it is standing directly on the playmat.\nModels on GROUND LEVEL cannot Engage models on HIGH LEVEL, and vice versa. Models on GROUND LEVEL can Engage models on MID GROUND only if both models are adjacent to the same ACCESS POINT connecting their respective elevations.\nA model at GROUND LEVEL has an Effective Size equal to its own Size characteristic only.',
      ko: '고도 단계 중 하나. 모델이 플레이매트 위에 직접 서 있으면 GROUND LEVEL에 있는 것이다.\nGROUND LEVEL에 있는 모델은 HIGH GROUND에 있는 모델과 Engage할 수 없으며, 그 반대도 마찬가지다. GROUND LEVEL에 있는 모델은 두 모델이 각자의 고도를 연결하는 같은 ACCESS POINT에 인접해 있을 때만 MID GROUND에 있는 모델과 Engage할 수 있다.\nGROUND LEVEL에 있는 모델의 Effective Size는 자신의 Size 특성치와 같다.',
    },
  },
  {
    name: 'HEAL (X)',
    definition: {
      en: "Remove X points of accumulated Damage from the Unit (reduce its Damage Marker accordingly). HEAL cannot return Destroyed models - it only reduces existing Damage. See also: RESPAWN.",
      ko: '그 유닛에 누적된 Damage를 X만큼 제거한다 (그만큼 Damage Marker를 줄인다). HEAL은 Destroyed된 모델을 되돌리지 못한다 - 기존 Damage만 줄인다. RESPAWN도 참고.',
    },
  },
  {
    name: 'HIDDEN',
    definition: {
      en: 'This Unit cannot be selected as the target of a Ranged Attack or any LoS-requiring Special Ability unless the acting model is Within 4" of it. A HIDDEN Unit is immune to the IMPACT keyword. A HIDDEN Unit may make an Evade Roll against every attack targeting it.\n• HIDDEN is classified as a Status.',
      ko: '행동하는 모델이 4" 이내에 있지 않은 한, 이 유닛은 Ranged Attack이나 Line of Sight가 필요한 Special Ability의 대상으로 지정될 수 없다. HIDDEN 유닛은 IMPACT 키워드에 면역이다. HIDDEN 유닛은 자신을 대상으로 하는 모든 공격에 대해 Evade Roll을 할 수 있다.\n• HIDDEN은 Status로 분류된다.',
    },
  },
  {
    name: 'HIGH GROUND',
    definition: {
      en: 'One of the elevation levels. Model is on the HIGH GROUND when standing on horizontal terrain of Size 3 or larger.\nModels on HIGH GROUND cannot Engage models on GROUND LEVEL, and vice versa. Models on HIGH GROUND can Engage models on MID GROUND only if both models are adjacent to the same ACCESS POINT connecting their respective elevations.\nA model on HIGH GROUND has an Effective Size equal to its own Size plus the terrain\'s Size.',
      ko: '고도 단계 중 하나. Size 3 이상인 수평 지형 위에 서 있으면 HIGH GROUND에 있는 것이다.\nHIGH GROUND에 있는 모델은 GROUND LEVEL에 있는 모델과 Engage할 수 없으며, 그 반대도 마찬가지다. HIGH GROUND에 있는 모델은 두 모델이 각자의 고도를 연결하는 같은 ACCESS POINT에 인접해 있을 때만 MID GROUND에 있는 모델과 Engage할 수 있다.\nHIGH GROUND에 있는 모델의 Effective Size는 자신의 Size에 지형의 Size를 더한 값이다.',
    },
  },
  {
    name: 'HITS X (Y)',
    definition: {
      en: 'The affected Unit suffers X automatic hits. Set X dice directly into the Armour Pool and proceed immediately to Armour Rolls (Part 8.7.4, Steps 3–4). Treat the Damage characteristic as Y. These hits do not generate Surge.',
      ko: '영향을 받는 유닛은 자동으로 X회의 명중을 받는다. X개의 주사위를 곧바로 Armour Pool에 넣고 즉시 Armour Roll을 진행한다 (Part 8.7.4, Step 3~4). Damage 특성치는 Y로 취급한다. 이 명중들은 Surge를 발생시키지 않는다.',
    },
  },
  {
    name: 'IMPACT (X) Y',
    definition: {
      en: 'Immediately after this Unit completes a successful Charge, check every model in the Fighting Rank or Supporting Rank. For each eligible model, generate X Impact Dice:\n• If the model is in the Fighting Rank or Supporting Rank against only one Enemy Unit, all X dice go to that Unit.\n• If the model is in the Fighting Rank or Supporting Rank against multiple Enemy Units, the controlling player may split the dice between those Units.\nRoll the allocated dice for each target Unit separately (this is the Impact Hit Roll). For each result of Y or higher, set 1 die into the target\'s Armour Pool. Proceed immediately to Armour Rolls. These hits do not generate Surge and treat Damage as 1.',
      ko: '이 유닛이 Charge에 성공한 직후, Fighting Rank나 Supporting Rank에 있는 모든 모델을 확인한다. 조건을 만족하는 각 모델마다 Impact Dice를 X개 생성한다:\n• 그 모델이 오직 하나의 적 유닛만을 상대로 Fighting Rank나 Supporting Rank에 있다면, X개의 주사위 모두 그 유닛에게 간다.\n• 그 모델이 여러 적 유닛을 상대로 Fighting Rank나 Supporting Rank에 있다면, 소유 플레이어는 그 유닛들 사이에 주사위를 나눌 수 있다.\n각 대상 유닛에 배정된 주사위를 따로 굴린다 (이를 Impact Hit Roll이라 한다). 결과가 Y 이상이면 그 대상의 Armour Pool에 주사위 1개를 넣는다. 즉시 Armour Roll을 진행한다. 이 명중들은 Surge를 발생시키지 않으며 Damage는 1로 취급한다.',
    },
  },
  {
    name: 'IMPASSABLE TERRAIN',
    definition: {
      en: 'A terrain piece is Impassable if it has no Access Point connecting it to an adjacent elevation level. Models cannot move through, onto, or across IMPASSABLE TERRAIN, and no model may end its movement overlapping it. Models can move through Terrain of Sizes 0 and 1.',
      ko: '지형물은 인접한 고도로 연결되는 Access Point가 없으면 Impassable(통과 불가)이다. 모델은 IMPASSABLE TERRAIN을 통과하거나, 그 위로 올라가거나, 가로질러 이동할 수 없으며, 그 지형물과 겹친 채로 이동을 마칠 수도 없다. 모델은 Size 0과 1인 지형은 통과해서 이동할 수 있다.',
    },
  },
  {
    name: 'INDIRECT FIRE',
    definition: {
      en: 'Ranged Attacks with this weapon may ignore Line of Sight when selecting a target and resolving Damage. The target must still be Within Range. If the target is not within Line of Sight, it may make an Evade Roll against this attack.',
      ko: '이 무기로 하는 Ranged Attack은 대상을 정하고 Damage를 처리할 때 Line of Sight를 무시할 수 있다. 다만 대상은 여전히 Range 이내에 있어야 한다. 대상이 Line of Sight 밖에 있다면, 그 대상은 이 공격에 대해 Evade Roll을 할 수 있다.',
    },
  },
  {
    name: 'INSTANT',
    definition: {
      en: 'Enemy Units cannot declare or resolve Reaction abilities in response to attacks made with this weapon.',
      ko: '적 유닛은 이 무기로 가해진 공격에 대응하여 Reaction 능력을 선언하거나 처리할 수 없다.',
    },
  },
  {
    name: 'LEADING MODEL',
    definition: {
      en: "The Leading Model is a temporary reference point used to execute a Unit's movement. Whenever a Unit performs a Move, Deploy, Run, Charge, Disengage, Close Ranks, or any action that instructs the Unit to nominate a Leading Model, the Controlling Player selects one model in the Unit.\nMove the Leading Model first, measuring its exact path. Then set the remaining models in valid Coherency around the Leading Model's new position (Part 4.4). The Leading Model nomination ends once the action resolves. The Leading Model determines the Unit's Gap Clearance category and interacts with terrain restrictions (Part 4.6).",
      ko: 'Leading Model은 유닛의 이동을 처리하기 위해 임시로 지정하는 기준점이다. 유닛이 Move, Deploy, Run, Charge, Disengage, Close Ranks를 하거나 Leading Model 지정을 요구하는 행동을 할 때마다, 소유 플레이어는 그 유닛의 모델 하나를 선택한다.\nLeading Model을 먼저 이동시키며 정확한 경로를 측정한다. 그다음 나머지 모델들을 Leading Model의 새 위치를 기준으로 유효한 Coherency에 맞게 배치한다 (Part 4.4). Leading Model 지정은 그 행동이 끝나면 해제된다. Leading Model은 유닛의 Gap Clearance 분류를 결정하며 지형 제한과도 관련이 있다 (Part 4.6).',
    },
  },
  {
    name: 'LINE OF SIGHT (LoS)',
    definition: {
      en: "Line of Sight determines what a model can see and, by extension, what it can target with attacks and abilities.\nAll Line of Sight checks are resolved from a 2D top-down perspective, looking directly down at the battlefield from above. To determine if a model can see a target, trace an imaginary straight line from any part of the acting model's base to any part of the target model's base. Vertical height is never factored into the trace.\nIf the trace does not pass through any Blocking Terrain (any terrain piece with an Effective Size of 1 or greater), the target is Visible. No further checks are required.\nIf the trace passes through Blocking Terrain, the target is not automatically hidden. Apply the Cover rules (Part 7.1.1) to determine whether that terrain actually blocks the Line of Sight:\n• Full Cover: The terrain's Effective Size is equal to or greater than the Effective Size of both the attacker and the target. Line of Sight is blocked.\n• Direct Cover: The trace passes through a terrain piece, and either the attacker or the target is Within 1\" of that terrain, provided the terrain's Effective Size is equal to or greater than the Effective Size of the model that is Within 1\". Line of Sight is blocked. Exception: If both the attacker and the target are Within 1\" of the same terrain piece and Within 3\" of each other, resolve Line of Sight normally.\n• Elevation Dead Zone: A model on HIGH GROUND (Size 3+) cannot see a model at GROUND LEVEL that is Within 1\" of the base of the same terrain piece, and vice versa. The same Close Quarters exception applies.\nEach terrain piece is assessed independently. Terrain pieces do not combine their Effective Size or proximity. If no single terrain piece meets the requirements for Full Cover or Direct Cover, Line of Sight is not blocked, regardless of how many terrain pieces the trace passes through.\nA terrain piece's footprint is defined by its physical base or outermost edges viewed from above. Gaps, windows, doorways, and open interiors within the footprint do block the Line of Sight unless players agree otherwise during Battlefield Setup (Part 7.1).\nFlying models ignore the Full Cover rule. Direct Cover and the Elevation Dead Zone still apply. Treat a Flying model's Effective Size as higher than the Effective Size of any terrain piece on the table (Part 7.1.4).\nLine of Sight is mutual: if Model A can see Model B, Model B can see Model A through the same trace.",
      ko: 'Line of Sight는 모델이 무엇을 볼 수 있는지, 나아가 공격이나 능력으로 무엇을 대상으로 삼을 수 있는지를 결정한다.\n모든 Line of Sight 판정은 전장을 위에서 곧바로 내려다보는 2D 평면 시점으로 처리한다. 어떤 모델이 대상을 볼 수 있는지 확인하려면, 행동하는 모델의 베이스 어느 지점에서 대상 모델의 베이스 어느 지점까지 가상의 직선을 긋는다. 이때 높이는 전혀 고려하지 않는다.\n그 선이 어떤 Blocking Terrain(Effective Size 1 이상인 지형물)도 통과하지 않는다면 대상은 Visible이다. 더 이상의 확인은 필요 없다.\n그 선이 Blocking Terrain을 통과한다면, 대상이 자동으로 가려지는 것은 아니다. 그 지형이 실제로 Line of Sight를 막는지는 Cover 규칙(Part 7.1.1)으로 판정한다:\n• Full Cover: 그 지형의 Effective Size가 공격자와 대상 양쪽의 Effective Size보다 크거나 같다. Line of Sight가 막힌다.\n• Direct Cover: 선이 어떤 지형물을 통과하고, 공격자나 대상 중 하나가 그 지형으로부터 1" 이내에 있으며, 그 지형의 Effective Size가 1" 이내에 있는 그 모델의 Effective Size보다 크거나 같다. Line of Sight가 막힌다. 예외: 공격자와 대상 모두 같은 지형물로부터 1" 이내에 있고 서로 3" 이내에 있다면, Line of Sight는 평소대로 판정한다.\n• Elevation Dead Zone: HIGH GROUND(Size 3 이상)에 있는 모델은 같은 지형물의 베이스로부터 1" 이내에 있는 GROUND LEVEL의 모델을 볼 수 없으며, 그 반대도 마찬가지다. 같은 Close Quarters 예외가 적용된다.\n각 지형물은 독립적으로 판정한다. 지형물끼리 Effective Size나 근접 여부를 합산하지 않는다. 어떤 지형물도 Full Cover나 Direct Cover 조건을 만족하지 못한다면, 선이 몇 개의 지형물을 통과하든 상관없이 Line of Sight는 막히지 않는다.\n지형물의 외곽선은 위에서 봤을 때의 실제 베이스나 가장 바깥쪽 테두리로 정의한다. Battlefield Setup(Part 7.1) 중 플레이어들이 달리 합의하지 않는 한, 그 외곽선 안의 틈, 창문, 출입구, 열린 내부 공간도 Line of Sight를 막는 것으로 취급한다.\nFlying 모델은 Full Cover 규칙을 무시한다. Direct Cover와 Elevation Dead Zone은 그대로 적용된다. Flying 모델의 Effective Size는 테이블 위 어떤 지형물보다도 높은 것으로 취급한다 (Part 7.1.4).\nLine of Sight는 상호적이다: 모델 A가 모델 B를 볼 수 있다면, 같은 선을 통해 모델 B도 모델 A를 볼 수 있다.',
    },
  },
  {
    name: 'LOCKED IN (X)',
    definition: {
      en: 'When making a Ranged Attack with this weapon, add X to its RoA if the target Unit has Stationary Status.',
      ko: '이 무기로 Ranged Attack을 할 때, 대상 유닛이 Stationary Status를 가지고 있다면 RoA에 X를 더한다.',
    },
  },
  {
    name: 'LONG RANGE (X)',
    definition: {
      en: 'The maximum Range of this weapon increases to X".\nMeasure each attacking model\'s distance to the target individually:\n• Within normal profile Range: attack resolves normally.\n• Beyond profile Range but Within X": the model suffers a -1 Modifier to its Hit roll.\nIf a Batch contains models at both Standard and Long Range, generate the total dice but roll the two groups separately to account for different Hit Target Numbers.',
      ko: '이 무기의 최대 Range가 X"로 늘어난다.\n공격하는 각 모델과 대상 사이의 거리를 개별적으로 측정한다:\n• 원래 프로필 Range 이내: 공격을 평소대로 처리한다.\n• 프로필 Range는 넘지만 X" 이내: 그 모델은 Hit 굴림에 -1 수정치를 받는다.\n하나의 Batch 안에 Standard Range와 Long Range에 걸친 모델이 섞여 있다면, 전체 주사위 수는 합쳐서 생성하되 Hit 목표 수치가 다르므로 두 그룹을 따로 굴린다.',
    },
  },
  {
    name: 'MID GROUND',
    definition: {
      en: 'One of the elevation levels. Model is on the MID GROUND when standing on horizontal terrain of Size 1 or 2.\nModels on MID GROUND can Engage models on HIGH GROUND or GROUND LEVEL only if both models are adjacent to the same ACCESS POINT connecting their respective elevations.\nA model on MID GROUND has an Effective Size equal to its own Size plus the terrain\'s Size.',
      ko: '고도 단계 중 하나. Size 1 또는 2인 수평 지형 위에 서 있으면 MID GROUND에 있는 것이다.\nMID GROUND에 있는 모델은 두 모델이 각자의 고도를 연결하는 같은 ACCESS POINT에 인접해 있을 때만 HIGH GROUND나 GROUND LEVEL에 있는 모델과 Engage할 수 있다.\nMID GROUND에 있는 모델의 Effective Size는 자신의 Size에 지형의 Size를 더한 값이다.',
    },
  },
  {
    name: 'MISSION MARKERS',
    definition: {
      en: 'Numbered Markers are set on the battlefield during Setup at the coordinates shown on the Deployment Card. Each Marker is 32mm in diameter and has two sides: Activated or Deactivated. Markers 1 & 3 are Red, Markers 2 & 4 are Blue, and Marker 5 is Neutral.\nMission Markers are the primary scoring mechanism. At the end of each Round, players determine Control of each Marker by comparing the Total Current Supply Value of their eligible contesting Units (Part 8.9.1). A Unit may Contest a Mission Marker only if it is on the battlefield, In Coherency, and has at least one model Within 3" with Line of Sight to the Marker on the same elevation. Flying Units and BURROWED Units cannot Contest or Control Mission Markers.\nControl is Sticky- once a player Controls a Marker, it remains under their control until the opponent reclaims it with a higher contesting Supply total. A tied result never transfers control.',
      ko: '번호가 매겨진 Marker들은 Setup 중 Deployment Card에 표시된 좌표에 전장 위에 놓인다. 각 Marker는 지름 32mm이며 Activated와 Deactivated 두 면을 가진다. Marker 1과 3은 빨강, Marker 2와 4는 파랑, Marker 5는 중립이다.\nMission Marker는 주된 채점 수단이다. 매 라운드가 끝날 때, 플레이어들은 Contest 자격이 있는 유닛들의 Total Current Supply Value를 비교해서 각 Marker의 Control을 정한다 (Part 8.9.1). 유닛은 전장 위에 있고, In Coherency 상태이며, 같은 고도에서 Marker까지 Line of Sight가 통하는 모델이 하나 이상 3" 이내에 있을 때만 Mission Marker를 Contest할 수 있다. Flying 유닛과 BURROWED 유닛은 Mission Marker를 Contest하거나 Control할 수 없다.\nControl은 Sticky(고정적)하다 - 한 플레이어가 Marker를 Control하면, 상대가 더 높은 Contest Supply 합계로 되찾기 전까지는 계속 그 플레이어가 Control한다. 동점이면 Control은 넘어가지 않는다.',
    },
  },
  {
    name: 'MODIFIER',
    definition: {
      en: 'A Modifier adjusts the Target Number of a roll. Apply all Modifiers before rolling (Part 3.4).\n• +X Modifier: Makes the roll easier by reducing the Target Number by X.\n• -X Modifier: Makes the roll harder by increasing the Target Number by X.\nModifiers from different named sources are cumulative unless otherwise stated. A Target Number can never be modified below 2+ or above 6+. Modifiers adjust the Target Number, not the dice result. A natural roll of 6 always succeeds, and a natural roll of 1 always fails, regardless of Modifiers (Part 3.6).\nA Modifier is distinct from a Fixed Addition (Part 3.5), which generates a value rather than adjusting a Target Number.',
      ko: 'Modifier(수정치)는 굴림의 목표 수치를 조정한다. 모든 Modifier는 굴리기 전에 적용한다 (Part 3.4).\n• +X Modifier: 목표 수치를 X만큼 낮춰서 굴리기 쉽게 만든다.\n• -X Modifier: 목표 수치를 X만큼 올려서 굴리기 어렵게 만든다.\n서로 다른 이름의 출처에서 온 Modifier는 별도 명시가 없는 한 누적된다. 목표 수치는 2+보다 낮아지거나 6+보다 높아질 수 없다. Modifier는 목표 수치를 조정할 뿐 주사위 결과 자체를 바꾸지 않는다. 자연 판정 6은 Modifier와 무관하게 항상 성공하고, 자연 판정 1은 항상 실패한다 (Part 3.6).\nModifier는 목표 수치를 조정하는 대신 값을 만들어내는 Fixed Addition(Part 3.5)과는 다른 개념이다.',
    },
  },
  {
    name: 'Morph (Name)',
    definition: {
      en: 'The controlling player must have sufficient Available Supply. Set one (Name) model in Base-to-Base contact with a model from the active Unit, then remove that model from the battlefield. The (Name) model forms a new Unit and cannot be set Within 1" of any Enemy Unit. Place an Activation Marker next to the new Unit; it cannot be Activated for the remainder of the Round.',
      ko: '소유 플레이어는 충분한 Available Supply를 가지고 있어야 한다. (Name) 모델 하나를 활성화 중인 유닛의 모델과 베이스가 맞닿도록 놓은 다음, 그 모델을 전장에서 제거한다. (Name) 모델은 새로운 유닛을 이루며 어떤 적 유닛으로부터도 1" 이내에는 놓을 수 없다. 새 유닛 옆에 Activation Marker를 놓는다; 그 유닛은 이번 라운드의 남은 동안 Activated될 수 없다.',
    },
  },
  {
    name: 'NON-LETHAL DAMAGE (X)',
    definition: {
      en: "The Unit suffers X points of Damage. Add this amount effectively to the Unit's Damage Marker. Do not remove any models, even if Total Damage exceeds a model's HP. If the Unit subsequently suffers standard Damage, the combined Total Damage triggers casualty removal normally.",
      ko: '그 유닛은 Damage를 X만큼 받는다. 이 값은 그대로 그 유닛의 Damage Marker에 더한다. Total Damage가 모델의 HP를 넘더라도 모델을 제거하지 않는다. 이후 그 유닛이 일반 Damage를 받으면, 합산된 Total Damage에 따라 평소대로 casualty 제거가 발생한다.',
    },
  },
  {
    name: 'ON CREEP',
    definition: {
      en: 'A Friendly or Enemy Ground Zerg Unit is considered to be ON CREEP while it is Within 6" of any Creep Tumor Token or any model designated as a Source of Creep. While satisfying this condition, the Unit gains the ON CREEP keyword. This allows the Unit to trigger specific Special Abilities or Upgrades that require this state.',
      ko: '아군이든 적이든 지상 Zerg 유닛은 Creep Tumor 토큰이나 Source of Creep으로 지정된 모델로부터 6" 이내에 있는 동안 ON CREEP 상태로 본다. 이 조건을 만족하는 동안 그 유닛은 ON CREEP 키워드를 얻는다. 이는 이 상태를 요구하는 특정 Special Ability나 Upgrade를 발동시킬 수 있게 한다.',
    },
  },
  {
    name: 'PIERCE [TAG] X',
    definition: {
      en: "When attacking a Unit with the specified Combat Tag, treat this weapon's Damage characteristic as X.",
      ko: '지정된 Combat Tag를 가진 유닛을 공격할 때, 이 무기의 Damage 특성치를 X로 취급한다.',
    },
  },
  {
    name: 'PINPOINT',
    definition: {
      en: 'Ranged Attacks with this weapon may target Engaged Enemy Units, ignoring the standard Engagement Status restriction (overrides Part 8.7.3, Step 1).',
      ko: '이 무기로 하는 Ranged Attack은 표준 Engagement 상태 제한을 무시하고 Engaged 상태인 적 유닛을 대상으로 삼을 수 있다 (Part 8.7.3, Step 1을 무시한다).',
    },
  },
  {
    name: 'PLACE (X)',
    definition: {
      en: 'Choose a Leading Model. Remove it and set it Wholly Within X" of its starting position. Then remove and replace all other models in the Unit, maintaining Coherency (Part 4.4). PLACE ignores Gap Clearance, and elevation requirements. The Leading Model is removed and set directly, not moved along a path. However, they must end in a legal position and not Within the Engagement Range of any enemy model. Models using the PLACE effect during the Assault Phase may be set Within the Engagement Range of Enemy models (the Unit becomes Engaged) unless stated otherwise.',
      ko: 'Leading Model을 정한다. 그 모델을 치웠다가 원래 위치로부터 X" 이내에 완전히 들어오도록(Wholly Within) 다시 놓는다. 그다음 유닛의 나머지 모델들도 모두 치웠다가 Coherency를 유지하며 다시 놓는다 (Part 4.4). PLACE는 Gap Clearance와 고도 조건을 무시한다. Leading Model은 경로를 따라 이동하는 것이 아니라 치워졌다가 곧바로 놓인다. 다만 정당한 위치에서 끝나야 하며 어떤 적 모델의 Engagement Range 이내에도 놓일 수 없다. Assault Phase 중 PLACE 효과를 쓰는 모델은, 달리 명시되지 않는 한 적 모델의 Engagement Range 이내에 놓일 수 있다 (그 경우 유닛은 Engaged 상태가 된다).',
    },
  },
  {
    name: 'PRECISION (X)',
    definition: {
      en: 'After rolling to Hit, move up to X failed Attack Dice directly into the Armour Pool. Treat them as successful Hits for all purposes, including Surge.',
      ko: 'Hit 굴림을 마친 후, 실패한 Attack Dice 중 최대 X개를 곧바로 Armour Pool로 옮긴다. 그 주사위들은 Surge를 포함한 모든 목적에서 성공한 Hit으로 취급한다.',
    },
  },
  {
    name: 'READY',
    definition: {
      en: 'The default state of a Tactical Card or Faction Card. A Ready card is face-up, its abilities are available, and it may be Exhausted to pay resource costs or activate its Special Abilities. All Tactical Cards and Faction Cards begin each Round in the Ready state. Cards that have been Exhausted are returned to Ready during Cleanup & Refresh (Part 8.9.5).',
      ko: 'Tactical Card나 Faction Card의 기본 상태. Ready 상태인 카드는 앞면이 보이고, 그 능력을 사용할 수 있으며, 자원 비용을 내거나 Special Ability를 발동하기 위해 Exhausted될 수 있다. 모든 Tactical Card와 Faction Card는 매 라운드를 Ready 상태로 시작한다. Exhausted된 카드는 Cleanup & Refresh 때 다시 Ready 상태로 돌아간다 (Part 8.9.5).',
    },
  },
  {
    name: 'REPEATABLE',
    definition: {
      en: 'This ability is exempt from the Once Per Round limit (Part 2.7.1). It may be used multiple times per Round and per Activation, provided all Costs and trigger conditions are met each time.',
      ko: '이 능력은 Once Per Round 제한(Part 2.7.1)을 받지 않는다. 매번 비용과 발동 조건을 만족하는 한, 한 라운드와 한 Activation 안에서도 여러 번 사용할 수 있다.',
    },
  },
  {
    name: 'RESERVES',
    definition: {
      en: 'A holding area off the battlefield where Units remain until they are deployed. All Units begin the game in Reserves.\nWhile in Reserves, a Unit:\n• Cannot be targeted by attacks or abilities unless an ability explicitly states it affects Units in Reserves.\n• Cannot use Active Abilities, Passive Abilities, or Reaction Abilities unless the ability explicitly states otherwise.\n• Cannot Control or Contest Mission Markers.\n• Does not contribute its Current Supply Value to the player\'s Total Current Supply on the battlefield.\n• Retains all equipment, upgrades, and weapon selections assigned during Army Building.\nA Unit leaves Reserves when it is deployed to the battlefield via a Deploy action (Part 8.5.5). Some rules may return a Unit to Reserves during play- see Part 8.5.5 for how Damage, effects, and Supply are handled. In the final Round of the game, all Units still in Reserves that are not deployed are treated as Destroyed for scoring purposes (Part 8.10).',
      ko: '유닛이 배치되기 전까지 머무는, 전장 밖의 대기 공간. 모든 유닛은 게임을 Reserves에서 시작한다.\nReserves에 있는 동안 유닛은:\n• 어떤 능력이 Reserves에 있는 유닛에게도 영향을 준다고 명시하지 않는 한, 공격이나 능력의 대상이 될 수 없다.\n• 능력이 명시적으로 달리 말하지 않는 한, Active Ability, Passive Ability, Reaction Ability를 사용할 수 없다.\n• Mission Marker를 Control하거나 Contest할 수 없다.\n• 전장 위 플레이어의 Total Current Supply에 자신의 Current Supply Value를 포함시키지 않는다.\n• Army Building 중에 배정된 장비, 업그레이드, 무기 선택은 그대로 유지한다.\n유닛은 Deploy 행동(Part 8.5.5)으로 전장에 배치되면 Reserves를 벗어난다. 일부 규칙은 게임 도중 유닛을 다시 Reserves로 되돌리기도 한다 - Damage, 효과, Supply가 어떻게 처리되는지는 Part 8.5.5를 참고. 게임의 마지막 라운드에는, 배치되지 않고 Reserves에 남아 있는 모든 유닛을 채점 목적상 Destroyed로 취급한다 (Part 8.10).',
    },
  },
  {
    name: 'RESPAWN (X)',
    definition: {
      en: "Return up to X Destroyed models to this Unit.\n• The return cannot increase the Unit's Current Supply Value. Do not return a model if doing so would push the Unit into a higher Supply bracket.\n• Set each returned model in Base-to-Base contact with an existing model in the Unit. Returned models cannot be set Within the Engagement Range of any Enemy Unit.\n• If a model cannot be set legally, it cannot be returned.",
      ko: '• Destroyed된 모델을 최대 X개까지 이 유닛으로 되돌린다.\n• 되돌리는 것으로 유닛의 Current Supply Value가 올라가서는 안 된다. 모델을 되돌리면 유닛이 더 높은 Supply 구간으로 올라간다면 되돌리지 않는다.\n• 되돌리는 각 모델은 유닛의 기존 모델과 베이스가 맞닿도록 놓는다. 되돌린 모델은 어떤 적 유닛의 Engagement Range 이내에도 놓을 수 없다.\n• 정당하게 놓을 수 없는 모델은 되돌릴 수 없다.',
    },
  },
  {
    name: 'SHIELDED',
    definition: {
      en: 'If a Shield value is present on a Unit Card, add it to the Hit Points (HP) of the first model. The Unit is Shielded. The Unit loses its Shielded Status when the Total Damage assigned to it exceeds its Shield value or when the first model in the Unit is removed.\nThe Shielded Status is referenced by other abilities. Losing Shielded Status does not remove any remaining Hit Points, it only ends effects that require the Unit to be Shielded. Shielded Status cannot be restored by HEAL.',
      ko: 'Unit Card에 Shield 수치가 있다면, 그 값을 첫 번째 모델의 Hit Points(HP)에 더한다. 그 유닛은 Shielded 상태다. 유닛에 배정된 Total Damage가 Shield 수치를 넘거나 유닛의 첫 번째 모델이 제거되면 Shielded Status를 잃는다.\nShielded Status는 다른 능력에서 참조된다. Shielded Status를 잃어도 남은 Hit Points가 사라지지는 않으며, 단지 유닛이 Shielded 상태여야 하는 효과들이 끝날 뿐이다. Shielded Status는 HEAL로 되돌릴 수 없다.',
    },
  },
  {
    name: 'SIDEARM',
    definition: {
      en: 'When this Unit performs a Ranged Attack or Close Combat Attack, models equipped with this weapon may use it, ignoring the normal restriction of one weapon per model (Part 8.7.3). If a model is equipped with multiple SIDEARM weapons, it may use all of them in the same activation.\nAttacks made with each SIDEARM must be resolved in separate Batches. Because they are separate Batches, SIDEARM attacks may target a different Enemy Unit than the Unit\'s other weapons, subject to all standard target eligibility requirements.',
      ko: '이 유닛이 Ranged Attack이나 Close Combat Attack을 할 때, 이 무기를 가진 모델은 모델당 무기 하나라는 일반 제한(Part 8.7.3)을 무시하고 이 무기를 사용할 수 있다. 한 모델이 여러 개의 SIDEARM 무기를 가지고 있다면, 같은 Activation에서 그것들을 모두 사용할 수 있다.\n각 SIDEARM으로 하는 공격은 서로 다른 Batch로 따로 처리해야 한다. 서로 다른 Batch이므로, 표준 대상 조건을 모두 만족한다면 SIDEARM 공격은 그 유닛의 다른 무기와 다른 적 유닛을 대상으로 삼을 수 있다.',
    },
  },
  {
    name: 'SIEGE MODE',
    definition: {
      en: 'While a Unit has the SIEGE MODE Status, apply the following rules:\n• This Unit cannot perform the Move, Disengage, Run, Charge or Close Ranks actions.\n• Weapons profile with Siege Mode Status can only be used while this unit has SIEGE MODE Status.\n• While this unit has Siege Mode Status any other weapons can\'t be used.\n• When this Unit is returned to Reserves, it loses the SIEGE MODE Status.',
      ko: '유닛이 SIEGE MODE Status를 가지고 있는 동안 다음 규칙이 적용된다:\n• 이 유닛은 Move, Disengage, Run, Charge, Close Ranks 행동을 할 수 없다.\n• Siege Mode Status가 필요한 무기 프로필은 이 유닛이 SIEGE MODE Status를 가지고 있을 때만 사용할 수 있다.\n• 이 유닛이 Siege Mode Status를 가지고 있는 동안에는 다른 무기를 사용할 수 없다.\n• 이 유닛이 Reserves로 돌아가면 SIEGE MODE Status를 잃는다.',
    },
  },
  {
    name: 'SPECIAL ABILITY',
    definition: {
      en: 'A Special Ability is any named ability printed on a Unit Card, Tactical Card, or Faction Card. Every Special Ability falls into one of three categories: Active Ability, Passive Ability, or Reaction Ability (Part 2.7).\n• Active Abilities require the Unit to be Activated and are triggered immediately before or after an action. Each named Active Ability may be used once per Round per Unit unless it has the REPEATABLE keyword.\n• Passive Abilities are always in effect as long as the Unit is on the battlefield.\n• Reaction Abilities fire in response to a specific trigger. Each player may resolve only one Reaction per Activation, and each named Reaction Ability may be used only once per Round per Unit.\nAll three types are inactive while the Unit is in Reserves unless the ability explicitly states otherwise. A Unit cannot be affected by multiple instances of the same-named Special Ability simultaneously.',
      ko: 'Special Ability는 Unit Card, Tactical Card, Faction Card에 이름이 적힌 모든 능력을 말한다. 모든 Special Ability는 Active Ability, Passive Ability, Reaction Ability 세 가지 중 하나에 속한다 (Part 2.7).\n• Active Ability는 유닛이 Activated 상태여야 하며 어떤 행동 직전이나 직후에 발동한다. REPEATABLE 키워드가 없는 한, 같은 이름의 Active Ability는 유닛당 라운드에 한 번만 사용할 수 있다.\n• Passive Ability는 유닛이 전장에 있는 한 항상 적용된다.\n• Reaction Ability는 특정 트리거에 대응해서 발동한다. 각 플레이어는 하나의 Activation당 하나의 Reaction만 처리할 수 있으며, 같은 이름의 Reaction Ability는 유닛당 라운드에 한 번만 사용할 수 있다.\n능력이 명시적으로 달리 말하지 않는 한, 이 세 가지 모두 유닛이 Reserves에 있는 동안에는 발동하지 않는다. 유닛은 같은 이름의 Special Ability를 동시에 여러 번 적용받을 수 없다.',
    },
  },
  {
    name: 'SPECIALIST',
    definition: {
      en: 'A Unit may include only one model equipped with this weapon. Multiple upgrades configuring more than one instance of this weapon are not permitted (Part 9.1.7).',
      ko: '유닛은 이 무기를 장착한 모델을 하나만 포함할 수 있다. 이 무기를 둘 이상 갖추게 하는 여러 개의 업그레이드는 허용되지 않는다 (Part 9.1.7).',
    },
  },
  {
    name: 'SPILLOVER',
    definition: {
      en: 'Additional hits generated by a Template Weapon that strike models outside the Primary target Unit. When a Blast Template (BT) or Flamer Template (FT) covers models belonging to Units other than the Primary target, those models are resolved as Spillover. Each affected Unit is resolved as a separate Batch. Spillover Batches do not apply Rate of Attack modifiers and do not generate Surge. Spillover may affect both Friendly and Enemy Units. See Part 8.7.6 for the full Template Weapon procedure.',
      ko: 'Template Weapon이 만들어내는 추가 명중 중, Primary 대상 유닛 밖의 모델에 맞는 것. Blast Template(BT)나 Flamer Template(FT)가 Primary 대상이 아닌 다른 유닛에 속한 모델을 덮으면, 그 모델들은 Spillover로 처리한다. 영향을 받는 각 유닛은 별도의 Batch로 처리한다. Spillover Batch는 RoA 수정치를 적용하지 않으며 Surge도 발생시키지 않는다. Spillover는 아군과 적 유닛 모두에게 영향을 줄 수 있다. Template Weapon의 전체 절차는 Part 8.7.6 참고.',
    },
  },
  {
    name: 'STATIONARY',
    definition: {
      en: 'At the Start of the Round, all Units gain this Status. A Unit immediately loses this Status if any model in this Unit moves, is moved, or is PLACED for any reason.',
      ko: '라운드 시작 시, 모든 유닛은 이 Status를 얻는다. 이유를 막론하고 그 유닛의 모델 하나라도 이동하거나, 옮겨지거나, PLACE되면 그 유닛은 즉시 이 Status를 잃는다.',
    },
  },
  {
    name: 'STATUS',
    definition: {
      en: 'A category of keyword representing a temporary or persistent operational mode, condition, or statistic modifier affecting a Unit (e.g. BURROWED, SIEGE MODE). Unless stated otherwise, Statuses aren\'t removed during the Scoring and Cleanup Phase. They stay on the Unit until they are removed by other means.\nA Unit\'s active Status is visually tracked using Status Markers set next to the Unit:\n• Modes: Use Plastic Markers to track operational shifts (e.g. SIEGE MODE, BURROWED). Those Status Markers have STAY IN PLAY.\n• Other Statuses: Use Markers to track other effects affecting the Unit. Positive effects are tracked with Buff Markers (Blue), and negative effects are tracked with Debuff Markers (Red). Those Status Markers have STAY IN PLAY.',
      ko: '유닛에 영향을 주는 일시적이거나 지속적인 작동 모드, 상태, 수치 변화를 나타내는 키워드 분류 (예: BURROWED, SIEGE MODE). 달리 명시되지 않는 한 Status는 Scoring and Cleanup Phase에도 제거되지 않는다. 다른 방법으로 제거되기 전까지 그 유닛에 계속 남아 있다.\n유닛의 현재 Status는 유닛 옆에 놓는 Status Marker로 시각적으로 표시한다:\n• 모드: SIEGE MODE, BURROWED처럼 작동 방식의 전환은 플라스틱 Marker로 표시한다. 이 Status Marker들은 STAY IN PLAY를 가진다.\n• 기타 Status: 유닛에 영향을 주는 다른 효과는 Marker로 표시한다. 긍정적인 효과는 Buff Marker(파랑)로, 부정적인 효과는 Debuff Marker(빨강)로 표시한다. 이 Status Marker들도 STAY IN PLAY를 가진다.',
    },
  },
  {
    name: 'STAY IN PLAY',
    definition: {
      en: 'This Token, Marker or Ability Effect persists through Cleanup & Refresh (overrides Part 8.9.5). It remains until a specific condition removes it (e.g. destroyed or duration expires).',
      ko: '이 토큰, Marker, 또는 능력 효과는 Cleanup & Refresh를 거쳐도 사라지지 않는다 (Part 8.9.5를 무시한다). 특정 조건(예: 파괴되거나 지속시간이 끝남)이 제거하기 전까지 남아 있는다.',
    },
  },
  {
    name: 'SUMMON (Unit Name)',
    definition: {
      en: "Set the Leading Model of the named Unit in Base-to-Base contact with the Parent Unit. Set remaining models In Coherency. Models cannot be set Within the Engagement Range of any Enemy Unit.\nSet an Activation Marker next to the summoned Unit - it cannot be Activated during the Phase in which it was summoned. In subsequent Phases, this Unit must be Activated immediately after its Parent Unit's activation ends, before the opponent's next activation.\nThe Summoned Unit cannot be set Within the opponent's Zone of Influence. The player must have sufficient Available Supply. If the Unit's Current Supply Value would cause Total Current Supply to exceed the Supply Pool, it cannot be Summoned.\nIf the Parent is not present on the battlefield, this Unit can be Activated normally.",
      ko: '이름이 지정된 유닛의 Leading Model을 Parent 유닛과 베이스가 맞닿도록 놓는다. 나머지 모델은 In Coherency 상태로 놓는다. 모델은 어떤 적 유닛의 Engagement Range 이내에도 놓을 수 없다.\n소환된 유닛 옆에 Activation Marker를 놓는다 - 그 유닛은 소환된 그 Phase에는 Activated될 수 없다. 이후의 Phase부터는, 그 유닛은 상대의 다음 Activation 전, Parent 유닛의 Activation이 끝난 직후에 반드시 Activated되어야 한다.\n소환된 유닛은 상대의 Zone of Influence 이내에는 놓을 수 없다. 플레이어는 충분한 Available Supply를 가지고 있어야 한다. 그 유닛의 Current Supply Value 때문에 Total Current Supply가 Supply Pool을 넘게 된다면 소환할 수 없다.\nParent가 전장에 없다면, 그 유닛은 평소대로 Activated될 수 있다.',
    },
  },
  {
    name: 'SUPPLY VALUE',
    definition: {
      en: "The Supply Value of a Unit is the value shown on the Unit Card's Supply Profile corresponding to the Unit's current model count. A Unit's starting Supply Value is determined during Army Building by the Composition Option selected (Part 9.1.6) and defines how many Army Slots the Unit occupies.\nSupply Value is a dynamic characteristic- as casualties reduce the model count into a lower bracket on the Supply Profile, the Supply Value decreases. Update immediately when a casualty moves the Unit into a lower bracket. Supply is used for Deployment, Mission Marker Control, Tactical Mass, and scoring.",
      ko: '유닛의 Supply Value는 Unit Card의 Supply Profile에서 그 유닛의 현재 모델 수에 해당하는 값이다. 유닛의 시작 Supply Value는 Army Building 중 선택한 Composition Option(Part 9.1.6)으로 정해지며, 그 유닛이 차지하는 Army Slot의 수를 결정한다.\nSupply Value는 가변적인 특성치다 - casualty로 모델 수가 Supply Profile의 더 낮은 구간으로 줄어들면 Supply Value도 낮아진다. casualty로 유닛이 더 낮은 구간으로 넘어가면 즉시 갱신한다. Supply는 Deployment, Mission Marker Control, Tactical Mass, 채점에 쓰인다.',
    },
  },
  {
    name: 'SUPPORTING RANK',
    definition: {
      en: 'A model is in the Supporting Rank if it is in Base-to-Base contact with a Friendly model from the same Unit that is in the Fighting Rank, but is not itself Within the Engagement Range of an Enemy model. Models in the Supporting Rank may strike with their Combat Phase weapons as though they were in the fight. See Part 8.8.1, Step 2.',
      ko: '모델은 같은 유닛의 Fighting Rank에 있는 아군 모델과 베이스가 맞닿아 있지만 자신은 적 모델의 Engagement Range 이내에 있지 않을 때 Supporting Rank에 속한다. Supporting Rank에 있는 모델은 마치 전투에 참여한 것처럼 자신의 Combat Phase 무기로 공격할 수 있다. Part 8.8.1, Step 2 참고.',
    },
  },
  {
    name: 'TACTICAL MASS',
    definition: {
      en: 'A Unit has Tactical Mass when its Current Supply Value exceeds the Combined Current Supply Value of all Enemy Units it is Engaged with. A Unit with Tactical Mass ignores the Disengage penalty (Part 8.5.4): it may Ranged Attack and Charge normally in the following Assault Phase after Disengaging.',
      ko: '유닛의 Current Supply Value가 자신과 Engaged 상태인 모든 적 유닛의 Combined Current Supply Value를 넘으면 그 유닛은 Tactical Mass를 가진다. Tactical Mass를 가진 유닛은 Disengage 페널티(Part 8.5.4)를 무시한다: Disengage한 다음 Assault Phase에서 평소대로 Ranged Attack과 Charge를 할 수 있다.',
    },
  },
  {
    name: 'TOUGH (X)',
    definition: {
      en: 'When this Unit resolves an Armour Roll, change up to X failed results into successes. Treat them as meeting or exceeding the Armour characteristic - discard them without moving to the Damage Pool.',
      ko: '이 유닛이 Armour Roll을 처리할 때, 실패한 결과 중 최대 X개를 성공으로 바꾼다. 그 결과들은 Armour 특성치를 만족하거나 넘긴 것으로 취급한다 - Damage Pool로 옮기지 않고 그대로 버린다.',
    },
  },
  {
    name: 'UNENGAGED',
    definition: {
      en: 'A Ground Unit is Unengaged when none of its models is Within 1" of any Enemy Ground model, or when terrain restrictions (Part 7.2.1) prevent valid Engagement despite proximity. Flying Units are always Unengaged.\nAn Unengaged Unit may perform a standard Move, Run, Ranged Attack, or Charge without restriction. Only Unengaged Units may be selected to perform a Move action (Part 8.5.2).',
      ko: '지상 유닛은 자신의 어떤 모델도 적 지상 모델과 1" 이내에 있지 않거나, 가까이 있더라도 지형 제한(Part 7.2.1) 때문에 정당한 Engagement가 성립하지 않으면 Unengaged 상태다. Flying 유닛은 항상 Unengaged다.\nUnengaged 유닛은 제한 없이 일반 Move, Run, Ranged Attack, Charge를 할 수 있다. Move 행동은 Unengaged 유닛만 선택할 수 있다 (Part 8.5.2).',
    },
  },
  {
    name: 'VISIBLE',
    definition: {
      en: 'A model is Visible to another model if a valid Line of Sight trace can be drawn between them (Part 7.1). If the trace does not pass through any Blocking Terrain, the target is Visible without further checks. If the trace passes through Blocking Terrain, apply the Cover rules (Part 7.1.1) - the target remains Visible unless Full Cover or Direct Cover blocks the Line of Sight.',
      ko: '모델 사이에 유효한 Line of Sight 선을 그을 수 있다면 그 모델은 서로에게 Visible이다 (Part 7.1). 그 선이 어떤 Blocking Terrain도 통과하지 않는다면 더 확인할 것 없이 대상은 Visible이다. 선이 Blocking Terrain을 통과한다면 Cover 규칙(Part 7.1.1)을 적용한다 - Full Cover나 Direct Cover가 Line of Sight를 막지 않는 한 대상은 여전히 Visible이다.',
    },
  },
  {
    name: 'WHOLLY WITHIN',
    definition: {
      en: 'A model is Wholly Within a distance only if its entire base sits inside that range - no part of the base may extend beyond the edge. A Unit is Wholly Within a distance only if every model in the Unit satisfies this condition.\nWholly Within is a stricter requirement than Within and is used for Coherency checks (Part 4.4), certain ability areas of effect, and Mission Marker eligibility. When a rule specifies Wholly Within, partial overlap is not sufficient.',
      ko: '모델은 자신의 베이스 전체가 그 범위 안에 들어와 있을 때만 - 베이스의 어느 부분도 그 경계를 벗어나지 않을 때만 - 그 거리에 Wholly Within이다. 유닛은 그 유닛의 모든 모델이 이 조건을 만족할 때만 그 거리에 Wholly Within이다.\nWholly Within은 Within보다 엄격한 조건이며 Coherency 판정(Part 4.4), 일부 능력의 효과 범위, Mission Marker 자격 판정에 쓰인다. 규칙이 Wholly Within을 요구할 때는 일부만 걸치는 것으로는 충분하지 않다.',
    },
  },
  {
    name: 'WITHIN',
    definition: {
      en: 'A model is Within a distance if any part of its base touches or crosses into that range. A Unit is Within a distance if at least one model in the Unit meets this condition.\nWithin is a less restrictive requirement than Wholly Within. When a rule specifies Within without the word "Wholly," partial overlap is sufficient.',
      ko: '모델은 자신의 베이스 일부라도 그 범위에 닿거나 걸쳐 있으면 그 거리에 Within이다. 유닛은 그 유닛의 모델 중 하나라도 이 조건을 만족하면 그 거리에 Within이다.\nWithin은 Wholly Within보다 덜 엄격한 조건이다. 규칙이 "Wholly" 없이 Within만 요구할 때는 일부만 걸쳐도 충분하다.',
    },
  },
  {
    name: 'ZONE OF INFLUENCE',
    definition: {
      en: "A restricted area of the battlefield extending 6\" inward from a player's Entry Edge, as defined by the Deployment Card. Where the Entry Edge does not run the full length of a table edge, the Zone of Influence is marked using Zone of Influence Markers set at the corners of the Entry Edge.\nUnits arriving from Reserves cannot end their deployment Within the opponent's Zone of Influence. This restriction applies to all forms of arrival - whether by standard deployment, transport, or SUMMON (Part 8.3.3).\nThe Zone of Influence does not affect Units already on the battlefield. It does not restrict movement, block Line of Sight, or interact with any other rule once a Unit has completed its arrival.",
      ko: 'Deployment Card에 정의된 대로, 플레이어의 Entry Edge에서 안쪽으로 6" 뻗어 있는 전장의 제한 구역. Entry Edge가 테이블 가장자리 전체에 걸쳐 있지 않은 경우, Zone of Influence는 Entry Edge의 모서리에 놓는 Zone of Influence Marker로 표시한다.\nReserves에서 도착하는 유닛은 상대의 Zone of Influence 이내에서 배치를 마칠 수 없다. 이 제한은 표준 배치든, 수송이든, SUMMON이든 모든 형태의 도착에 적용된다 (Part 8.3.3).\nZone of Influence는 이미 전장에 있는 유닛에게는 영향을 주지 않는다. 유닛이 도착을 마치고 나면 이동을 제한하거나 Line of Sight를 막거나 다른 어떤 규칙과도 상호작용하지 않는다.',
    },
  },
]
