import type { Rule } from '../types'

export interface KeywordEntry {
  /** 안정적인 영문 식별자. 기존 영문 name 문자열과 동일한 값 */
  id: string
  name: Rule
  definition: Rule
}

export const KEYWORDS: KeywordEntry[] = [
  {
    id: 'ACCESS POINT',
    name: { en: 'ACCESS POINT', ko: '출입구' },
    definition: {
      en: 'Part of a Terrain that connects different elevation levels. Models moving through an ACCESS POINT can change their elevation.',
      ko: '서로 다른 고도를 연결하는 지형의 일부입니다. 출입구를 통과해 이동하는 모형은 자신의 고도를 변경할 수 있습니다.',
    },
  },
  {
    id: 'ACTIVATION MARKER',
    name: { en: 'ACTIVATION MARKER', ko: '활성화 마커' },
    definition: {
      en: 'A physical marker set beside a Unit that has completed its turn in the current Phase. Activation Markers are double-sided: the arrow-up side shows the Unit has finished its turn in the Movement Phase (Phase 1), and the reverse side shows it has finished its turn in the Assault Phase (Phase 2) (Part 7.3.2).',
      ko: '해당 단계에서 자신의 차례를 마친 유닛 옆에 놓는 마커입니다. 양면 마커이며, 화살표가 위를 향한 면은 이동 단계(1단계)에서 차례를 마쳤음을, 반대면은 공세 단계(2단계)에서 차례를 마쳤음을 나타냅니다(7.3.2 항목).',
    },
  },
  {
    id: 'ACTIVE PLAYER',
    name: { en: 'ACTIVE PLAYER', ko: '활성 플레이어' },
    definition: {
      en: 'The player whose turn it is to act.',
      ko: '현재 행동할 차례인 플레이어입니다.',
    },
  },
  {
    id: 'ANTI-EVADE (X)',
    name: { en: 'ANTI-EVADE (X)', ko: '회피 억제(X)' },
    definition: {
      en: 'When resolving an attack with this weapon against Enemy Units, the target Unit suffers a -X Modifier to its Evade Roll for this attack (Part 8.7.4, Step 4).',
      ko: '이 무기로 적 유닛에 대한 공격을 처리할 때, 대상 유닛은 해당 공격의 회피 굴림에 -X 수정치를 받습니다(8.7.4 항목, 4단계).',
    },
  },
  {
    id: 'ARMOUR POOL',
    name: { en: 'ARMOUR POOL', ko: '방어 주사위' },
    definition: {
      en: "The second of the three dice pools used to resolve an attack. The defender rolls all dice in the Armour Pool against the target Unit's Armour characteristic: each die that meets or exceeds the Armour value is a success and is discarded, while each failure moves to the Damage Pool. Dice moved out of the Armour Pool by Surge or CRITICAL HIT are set directly into the Damage Pool without an Armour Roll (Part 8.7.4).",
      ko: '공격을 처리하는 세 단계의 주사위 중 두 번째입니다. 방어자는 모든 방어 주사위를 대상 유닛의 방어 특성에 대해 굴립니다. 방어 수치 이상인 주사위는 성공이며 버립니다. 실패한 주사위는 피해 주사위가 됩니다. 상성 또는 치명타로 바뀌는 방어 주사위는 방어 굴림을 거치지 않고 즉시 피해 주사위가 됩니다(8.7.4 항목).',
    },
  },
  {
    id: 'ARMY SLOT',
    name: { en: 'ARMY SLOT', ko: '편성 슬롯' },
    definition: {
      en: 'Army Slots determine how many and what types of Units may be included in an army. Each Army Slot has a specific type: Core, Elite, Support, Air, or Hero. Every Unit occupies a number of Army Slots of its designated type equal to its starting Supply Value.\nThe Faction Card provides the initial pool of Army Slots. Additional Army Slots are unlocked by purchasing Tactical Cards with Vespene Gas during Army Building (Part 9.1.5). Unused Army Slots are lost - they cannot be converted, exchanged, or carried forward.',
      ko: '편성 슬롯은 병력에 몇 개의 유닛을, 어떤 유형으로 포함할 수 있는지를 결정합니다. 각 편성 슬롯에는 기본, 정예, 지원, 공중, 영웅 중 하나의 유형이 지정되어 있습니다. 모든 유닛은 자신의 유형에 해당하는 편성 슬롯을 시작 인구수만큼 차지합니다.\n진영 카드는 시작 편성 슬롯을 제공합니다. 병력 편성 중 베스핀 가스로 전술 카드를 구매하면 추가 편성 슬롯을 사용할 수 있습니다(9.1.5 항목). 사용하지 않은 편성 슬롯은 사라지며, 다른 유형의 슬롯으로 변환, 교환하거나 이월할 수 없습니다.',
    },
  },
  {
    id: 'ATTACK POOL',
    name: { en: 'ATTACK POOL', ko: '공격 주사위' },
    definition: {
      en: "The first of the three dice pools used to resolve an attack. Generate a number of dice equal to each attacking model's Rate of Attack (RoA), plus a Surge Die if the weapon has an S Dice characteristic. Roll all dice against the weapon's Hit characteristic: each die that meets or exceeds the Hit value is a success and moves to the Armour Pool, while failures are discarded (Part 8.7.4).",
      ko: '공격을 처리하는 세 단계의 주사위 중 첫 번째입니다. 각 공격 모형의 타격 횟수(타수)만큼 주사위를 생성하고, 무기에 S 주사위 특성치가 있다면 다른 색상의 상성 주사위 하나를 추가합니다. 모든 주사위를 무기의 명중 특성에 대해 굴립니다. 명중 수치 이상인 주사위는 성공이며 방어 주사위가 됩니다. 실패한 주사위는 버립니다(8.7.4 항목).',
    },
  },
  {
    id: 'AVAILABLE SUPPLY',
    name: { en: 'AVAILABLE SUPPLY', ko: '잔여 보급품' },
    definition: {
      en: 'Available Supply is the remaining Supply capacity available for new deployments. It equals the current Supply Pool minus the Total Current Supply Value of all Friendly Units on the battlefield (Part 8.3.2).\nA Unit may only be deployed from Reserves if its Current Supply Value is less than or equal to the Available Supply. At no point may the Total Current Supply of a player\'s on-table Units exceed the Supply Pool. Units Destroyed or reduced by casualties free up Available Supply for new arrivals. In the final Round of the game, the Supply Pool becomes unlimited, and the Available Supply restrictions are lifted.',
      ko: '잔여 보급품은 새로운 유닛을 전개하는 데 사용할 수 있는 남은 보급품 용량입니다. 현재 보급품 한도에서 전장에 있는 모든 아군 유닛들의 현재 최종 인구수 수치를 뺀 것과 같습니다(8.3.2 항목).\n유닛은 자신의 현재 인구수가 잔여 보급품 이하일 때만 예비 병력에서 전개될 수 있습니다. 전장에 있는 플레이어 유닛들의 현재 최종 인구수는 어떤 경우에도 보급품 한도를 초과할 수 없습니다. 전투에서 파괴되거나 사상자로 인해 모형 수가 줄어든 유닛은 잔여 보급품에 새로운 증원군을 위한 자리를 만들게 됩니다. 게임의 마지막 라운드에는 보급품 한도가 무제한이 되며 잔여 보급품 제한도 해제됩니다.',
    },
  },
  {
    id: 'BATCH',
    name: { en: 'BATCH', ko: '묶음' },
    definition: {
      en: "A Batch consists of all models firing the same weapon at the same target. All models using the same Weapon Profile must fire at the same target - a single profile's fire cannot be split. When a Unit has multiple Weapon Profiles or fires at different targets, each is resolved as a separate Batch: declare the target of one Batch, resolve it fully, then declare the next (Part 8.7.3).",
      ko: '묶음은 같은 무기로 같은 대상을 공격하는 모든 모형으로 구성됩니다. 같은 무기 프로필을 사용하는 모든 모형은 같은 대상을 공격해야 하며, 하나의 무기 프로필에서 발생하는 사격을 여러 대상에게 나눌 수 없습니다. 유닛이 여러 무기 프로필을 가지고 있다면 서로 다른 대상을 공격할 수 있으며, 이 경우 각각 별도의 묶음으로 처리합니다.\n한 묶음의 대상을 선언하고 그 묶음을 완전히 처리한 뒤 다음 묶음의 대상을 선언합니다. 모든 대상을 동시에 선언하지 않습니다(8.7.3 항목).',
    },
  },
  {
    id: 'BLOCKING TERRAIN',
    name: { en: 'BLOCKING TERRAIN', ko: '엄폐물' },
    definition: {
      en: 'Any terrain piece with an Effective Size of 1 or greater. Blocking Terrain obstructs Line of Sight according to the Cover rules (Part 7.1.1). Whether a model may move through that terrain is determined separately by the movement rules, terrain Size, ACCESS POINTS, Gap Clearance, and any relevant terrain keywords.',
      ko: '유효 크기가 1 이상인 모든 지형 기물입니다. 엄폐물은 엄폐 규칙(7.1.1 항목)에 따라 시야를 차단할 수 있습니다.\n모형이 해당 지형을 통과하여 이동할 수 있는지는 이동 규칙, 지형의 크기, 출입구, 틈새 통과 및 관련 지형 키워드에 따라 결정됩니다.',
    },
  },
  {
    id: 'BUFF [Characteristic] (X)',
    name: { en: 'BUFF [Characteristic] (X)', ko: '[특성](X) 강화' },
    definition: {
      en: 'The Unit gains a bonus of X to the specified characteristic until the End of the Round.\n• Target Number characteristic (e.g. Armour, Hit): reduce the value by X (easier to roll).\n• Value characteristic (e.g. Speed, RoA): increase the value by X.',
      ko: '유닛은 라운드 종료까지 지정된 특성에 X만큼의 보너스를 얻습니다.\n난이도 수치 특성(예: 방어, 명중): 수치를 X만큼 낮춥니다. 따라서 굴림이 쉬워집니다.\n수치 특성(예: 속도, 타수): 수치를 X만큼 증가시킵니다.',
    },
  },
  {
    id: 'BULKY',
    name: { en: 'BULKY', ko: '중화기' },
    definition: {
      en: 'This weapon cannot be used to make a Ranged Attack while the Unit is currently Engaged (Part 8.7.3).',
      ko: '유닛이 현재 교전 중이라면 이 무기로 원거리 공격을 수행할 수 없습니다(8.7.3 항목).',
    },
  },
  {
    id: 'BURROWED',
    name: { en: 'BURROWED', ko: '잠복' },
    definition: {
      en: '• BURROWED is classified as a Status.\n• A BURROWED Unit has the HIDDEN Status.\n• Its Size is treated as 0 for all purposes\n• Its Current Supply Value is treated as 0 for Disengage checks.\n• A BURROWED Unit cannot Control or Contest Mission Markers (overrides Parts 6.2 and 8.9.1).\n• While BURROWED, the Unit may only perform Deploy, Move, Disengage, Run, Hold and Close Ranks actions. Performing any of these (except Hold) immediately removes the BURROWED status.\n• BURROWED Units may use Special Abilities unless stated otherwise.\n• BURROWED Units may make an Evade Roll against every attack targeting them.\n• Other models may move through a BURROWED Unit\'s models, provided they do not end Within the Engagement Range of the BURROWED Unit (overrides Part 8.5.3).\n• If a BURROWED Unit is Engaged at the start of the Combat Phase, it must be Activated but cannot perform a Close Combat Attack in its BURROWED state. The Unit may perform Close Ranks as its first step, which immediately removes the BURROWED status. Once the status is removed, the Unit completes the remaining steps of the Close Combat Attack normally. If the Unit does not or cannot perform Close Ranks, it does not attack. Enemy Units Engaged with a BURROWED Unit may attack it as normal regardless of its status.',
      ko: '잠복은 상태로 분류합니다.\n• 유닛이 잠복 상태를 얻으면 은신 상태도 얻습니다.\n• 라운드 시작 시 잠복 유닛은 은신 상태를 얻습니다.\n• 잠복 상태가 제거되면 은신 상태도 잃습니다.\n• 모든 규칙에서 해당 유닛의 크기를 0으로 취급합니다.\n• 이탈 판정에서는 해당 유닛의 현재 인구수를 0으로 취급합니다.\n• 잠복 유닛은 임무 마커를 점령하거나 경합할 수 없습니다(6.2 및 8.9.1 항목보다 우선).\n• 잠복 상태에서는 전개, 이동, 이탈, 질주, 위치 사수, 대열 정비 행동만 수행할 수 있습니다. 이 중 하나라도 수행하면(위치 사수 제외) 즉시 잠복 상태를 잃습니다.\n• 달리 명시되지 않는 한, 잠복 유닛도 특수 능력을 사용할 수 있습니다.\n• 잠복 유닛은 자신을 대상으로 하는 모든 공격에 대해 회피 굴림을 할 수 있습니다.\n• 다른 모형은 잠복 유닛의 모형을 통과하여 이동할 수 있습니다. 단, 잠복 유닛의 교전 범위 이내에 들어온 상태로 이동을 끝낼 수 없습니다(8.5.3 항목보다 우선).\n• 잠복 유닛이 전투 단계 시작 시 교전 중이라면 반드시 활성화해야 하지만, 잠복 상태에서는 근접전 공격을 수행할 수 없습니다. 근접전 공격의 첫 단계로 대열 정비를 수행할 수 있으며, 그렇게 하면 즉시 잠복 상태가 제거됩니다. 잠복 상태가 제거되면 남은 근접전 공격 단계를 정상적으로 진행합니다. 대열 정비를 수행하지 않거나 수행할 수 없다면 잠복 유닛은 공격하지 않습니다. 잠복 유닛과 교전 중인 적 유닛은 잠복 여부와 관계없이 정상적으로 해당 유닛을 공격할 수 있습니다.',
    },
  },
  {
    id: 'BURST FIRE Y" (X)',
    name: { en: 'BURST FIRE Y" (X)', ko: '집중 포화 Y"(X)' },
    definition: {
      en: 'When making a Ranged Attack against a target Within Y" of the attacking model, increase this weapon\'s RoA by X for that attack.',
      ko: '공격하는 모형으로부터 Y인치 이내에 들어온 대상을 상대로 원거리 공격을 수행할 때, 해당 공격에서 이 무기의 타수를 X회 증가시킵니다.',
    },
  },
  {
    id: 'COHERENCY',
    name: { en: 'COHERENCY', ko: '대형' },
    definition: {
      en: 'Coherency is checked at the end of any action that repositions models, including Move, Deploy, Charge, Disengage, Close Ranks, Run, PLACE, and SUMMON. At the end of such an action, all models in the Unit must be Wholly Within 3" of the Leading Model and able to trace a valid Coherency Link to it - if met, the Unit is In Coherency. A Unit with one or more models set beyond 3" (as close as possible while maintaining a valid Coherency Link) is Out of Coherency; Out of Coherency Units cannot control or contest Mission Markers. Casualties from any source never trigger a Coherency check and never cause a Unit to become Out of Coherency (Part 4.4).',
      ko: '모형의 위치를 재조정하는 모든 행동이 끝날 때 대형을 확인합니다. 여기에는 이동, 전개, 돌격, 이탈, 대열 정비, 질주, 배치, 소환 등이 포함됩니다.\n이러한 행동이 끝날 때 유닛의 모든 모형은 대표 모형의 3인치 이내에 완전히 들어온 상태여야 하며, 대표 모형까지 유효한 대형 연결을 그릴 수 있어야 합니다. 이 조건을 충족하면 해당 유닛은 대형 유지 상태입니다.\n지형이나 붐비는 위치 때문에 어떤 모형을 대표 모형의 3인치 이내에 완전히 들어온 적법한 위치에 놓을 수 없는 경우, 해당 모형을 대표 모형에 가능한 한 가깝게 놓습니다. 이 경우에도 유효한 대형 연결은 유지해야 합니다. 하나 이상의 모형이 3인치를 벗어나 놓여 있으면 해당 유닛은 대형 붕괴 상태이며, 대형 붕괴 상태인 유닛은 임무 마커를 점령하거나 경합할 수 없습니다(8.9.1 항목).\n대형 유지 상태인 유닛은 다음 위치 재조정 행동을 수행할 때까지 그 상태를 유지합니다. 어떤 원인으로 사상자가 발생하더라도 대형 확인을 새로 하지 않으며, 사상자 때문에 유닛이 대형 붕괴 상태가 되지는 않습니다(4.4 항목).',
    },
  },
  {
    id: 'COHERENCY LINK',
    name: { en: 'COHERENCY LINK', ko: '대형 연결' },
    definition: {
      en: 'A Coherency Link is a chain of imaginary lines drawn model-to-model through models of the same Unit, used to check whether a model can legally be set In Coherency. Links cannot pass through models from other Units, terrain, or gaps that the Leading Model itself could not move through, though a link may pass through Enemy models the Unit is currently Engaged with. A model that cannot find a legal position while maintaining a valid Coherency Link is immediately removed as a casualty. For a Flying Unit, Coherency Links ignore terrain and may pass through models from other Units (Part 4.4).',
      ko: '대형 연결은 같은 유닛의 모형과 모형 사이에 그리는 가상의 선이 연속적으로 이어져 대표 모형까지 도달하는 경로입니다. 대형 연결은 다른 유닛의 모형, 지형, 또는 대표 모형 자체가 통과할 수 없는 틈새를 통과할 수 없습니다. 단, 현재 해당 유닛과 교전 중인 적 모형과 출입구는 통과할 수 있습니다.\n유효한 대형 연결을 유지할 수 있는 적법한 위치를 찾지 못한 모형은 즉시 사상자로 제거됩니다.\n공중 유닛의 대형 연결을 그릴 때는 지형을 무시합니다. 연결은 크기에 관계없이 지형 기물을 자유롭게 통과할 수 있으며, 다른 유닛의 모형도 통과할 수 있습니다(4.4 항목).',
    },
  },
  {
    id: 'COMBAT TAGS',
    name: { en: 'COMBAT TAGS', ko: '전투 분류' },
    definition: {
      en: 'Combat Tags are keywords printed on a Unit Card that identify a Unit\'s physical nature and tactical class.\nType Tags: Armoured, Biological, Light, Mechanical, Psionic, Flying, and Ground.\n• Targeting: Some weapons can fire only at specific Combat Tags (e.g., "Target: Flying").\n• Surge: A weapon\'s Surge efficiency triggers only when the target has the Combat Tag listed in the weapon\'s Surge Type (Part 8.7.4).\n• Bonuses: Abilities such as ANTI-EVADE (X) or PIERCE (X) often apply only against specific Combat Tags.\nNote: The Ground Combat Tag and the GROUND LEVEL elevation (Part 8.5.3) are distinct concepts. A Flying Unit standing on the playmat is at GROUND LEVEL but does not have the Ground Combat Tag. Throughout these rules, Ground in bold always refers to the Combat Tag. GROUND LEVEL always refers to elevation.',
      ko: '전투 분류는 유닛 카드에 표시된 유닛의 물리적 성질과 전술적 병과를 나타내는 키워드입니다. 전투 분류에는 중장갑, 생체, 경장갑, 기계, 사이오닉, 공중, 지상이 있습니다.\n대상 지정: 일부 무기는 특정 전투 분류만 공격할 수 있습니다(예: "대상: 공중").\n상성: 무기의 상성 효과는 대상이 무기의 상성 유형에 적힌 전투 분류를 가지고 있을 때만 발동합니다(8.7.4 항목).\n보너스: 회피 억제(X), [분류](X) 관통과 같은 능력은 특정 전투 분류를 가진 대상을 상대로만 적용되는 경우가 많습니다.\n참고: 전투 분류인 지상과 고도인 지면(8.5.3 항목)은 서로 다른 개념입니다. 공중 유닛이 플레이 매트 위에 놓여 있다면 고도상 지면에 있지만, 지상 전투 분류를 갖는 것은 아닙니다.',
    },
  },
  {
    id: 'CONCENTRATED FIRE (X)',
    name: { en: 'CONCENTRATED FIRE (X)', ko: '점사(X)' },
    definition: {
      en: 'Attacks with this weapon may remove no more than X models as casualties. Once X models have been removed, discard any remaining Total Damage. It is not recorded as a Damage Marker and does not carry over.',
      ko: '이 무기로 하는 공격으로 제거할 수 있는 모형은 최대 X기입니다. X기의 모형을 제거한 뒤 남아 있는 최종 피해는 모두 버립니다. 남은 피해는 피해 마커에 기록하지 않으며 이월하지도 않습니다.',
    },
  },
  {
    id: 'CONTROLLING PLAYER',
    name: { en: 'CONTROLLING PLAYER', ko: '조종 플레이어' },
    definition: {
      en: 'The player who commands a specific Unit, model, or Token. They make all decisions and roll all dice. Certain abilities (e.g., Neural Parasite) can transfer control; the new controller then acts in every respect as though the Unit were their own.',
      ko: '특정 유닛, 모형 또는 토큰을 조종하는 플레이어입니다. 해당 플레이어가 모든 결정을 내리고 모든 주사위를 굴립니다. 신경 기생충과 같은 특정 능력은 조종권을 이전할 수 있으며, 이 경우 새로운 조종 플레이어는 모든 규칙에서 해당 유닛이 원래 자신의 유닛인 것처럼 행동을 수행합니다.',
    },
  },
  {
    id: 'CRITICAL HIT (X)',
    name: { en: 'CRITICAL HIT (X)', ko: '치명타(X)' },
    definition: {
      en: 'Move X dice from the Armour Pool directly to the Damage Pool, bypassing Armour. CRITICAL HIT can never move more dice than are in the Armour Pool.',
      ko: '방어를 무시하고 방어 주사위 중 X개를 피해 주사위로 바로 옮깁니다. 치명타로 옮기는 주사위 수는 현재 남아 있는 방어 주사위 수를 초과할 수 없습니다.',
    },
  },
  {
    id: 'CURRENT SUPPLY VALUE',
    name: { en: 'CURRENT SUPPLY VALUE', ko: '현재 인구수' },
    definition: {
      en: 'The Current Supply Value of a Unit is its Supply Value at this moment, based on the number of models remaining in the Unit as shown on the Supply Profile (Part 6.1). Update the Current Supply Value immediately whenever a casualty reduces the model count into a lower bracket.\nThe Current Supply Value is referenced when checking whether a Unit may be deployed from Reserves (Part 8.3.2), when determining Mission Marker Control (Part 8.9.1), when evaluating Tactical Mass for Disengage (Part 8.5.4), and when calculating Victory Points for Supply-based scoring conditions.',
      ko: '유닛의 현재 인구수는 유닛 카드의 인구수 프로필에 표시된, 현재 남아 있는 모형 수에 해당하는 인구수입니다(6.1 항목). 사상자로 인해 모형 수가 더 낮은 인구수 구간으로 내려가면 즉시 현재 인구수를 갱신합니다.\n현재 인구수는 예비 병력에서 유닛을 전개할 수 있는지 확인할 때(8.3.2 항목), 임무 마커의 점령권을 결정할 때(8.9.1 항목), 이탈 시 전술적 규모를 판정할 때(8.5.4 항목), 인구수를 사용하는 득점 조건에서 승점을 계산할 때 사용합니다.',
    },
  },
  {
    id: 'DAMAGE POOL',
    name: { en: 'DAMAGE POOL', ko: '피해 주사위' },
    definition: {
      en: "The third of the three dice pools used to resolve an attack. Each die remaining in the Damage Pool inflicts Damage equal to the weapon's Damage characteristic. If the target Unit is eligible for an Evade Roll, the defender rolls all dice in the Damage Pool against the Unit's Evade characteristic before Damage is applied - each die that meets or exceeds the Evade value is removed, and the remaining dice are confirmed Damage (Part 8.7.4).",
      ko: '공격을 처리하는 세 단계의 주사위 중 세 번째입니다. 남아 있는 각 주사위는 무기의 피해 특성만큼 피해를 가합니다. 대상 유닛이 회피 굴림을 할 수 있다면 피해를 적용하기 전에 모든 주사위를 유닛의 회피 특성에 대해 굴립니다. 회피 수치 이상인 주사위는 성공이며 버립니다. 남은 주사위는 정상적으로 피해를 가합니다(8.7.4 항목).',
    },
  },
  {
    id: 'DEBUFF [Characteristic] (X)',
    name: { en: 'DEBUFF [Characteristic] (X)', ko: '[특성](X) 약화' },
    definition: {
      en: 'The Unit suffers a penalty of X to the specified characteristic until the End of the Round.\n• Target Number characteristic: increase the value by X (harder to roll).\n• Value characteristic: decrease the value by X (minimum 0).',
      ko: '유닛은 라운드 종료 시까지 지정된 특성치에 X만큼 페널티를 받습니다.\n난이도 특성: 난이도 수치를 X만큼 높입니다. 따라서 굴림이 어려워집니다.\n수치 특성: 수치를 X만큼 감소시킵니다(최소 0).',
    },
  },
  {
    id: 'DISPLACEMENT',
    name: { en: 'DISPLACEMENT', ko: '위치 변환' },
    definition: {
      en: 'The Leading Model may end a move overlapping this Token or Unit (overrides Part 7.3.1).\nIf the Leading Model ends any Move, Deploy, Run, Charge, Disengage, Close Ranks or Special Ability move overlapping this Token or model, the controlling player of the Leading Model immediately sets it in Base-to-Base contact with the Leading Model. If Base-to-Base is not possible, set it as close as possible.',
      ko: '대표 모형은 이 키워드를 가진 토큰 또는 유닛과 겹친 상태로 이동을 끝낼 수 있습니다(7.3.1 항목보다 우선).\n대표 모형이 이동, 전개, 질주, 돌격, 이탈, 대열 정비 또는 특수 능력에 의한 이동을 해당 토큰이나 모형과 겹친 상태로 끝내면, 대표 모형의 조종 플레이어는 즉시 해당 토큰 또는 모형을 대표 모형과 베이스 접촉 상태가 되도록 놓습니다. 베이스 접촉 상태로 놓을 수 없다면 가능한 한 가까운 위치에 놓습니다.',
    },
  },
  {
    id: 'DODGE (X)',
    name: { en: 'DODGE (X)', ko: '경감(X)' },
    definition: {
      en: 'When this Unit is targeted by an attack, reduce the number of dice moved from the Armour Pool to the Damage Pool by Surge or CRITICAL HIT by X (minimum 0). Apply during the Resolve Surge step.',
      ko: '이 유닛이 공격의 대상이 되었을 때, 상성 또는 치명타로 방어 주사위에서 피해 주사위로 옮기는 주사위 수를 X만큼 감소시킵니다(최소 0개). 이 효과는 상성 처리 단계에서 적용합니다.',
    },
  },
  {
    id: 'EFFECTIVE SIZE',
    name: { en: 'EFFECTIVE SIZE', ko: '유효 크기' },
    definition: {
      en: "A model's Effective Size is equal to its Size characteristic plus the Size of any terrain it is standing on (Part 7.1.2).\nA model at GROUND LEVEL has an Effective Size equal to its own Size characteristic only. A model on HIGH GROUND (Size 3+) or MID GROUND (Size 1–2) adds the terrain's Size to its own. Terrain pieces set on elevated surfaces stack in the same way- a terrain piece's Effective Size equals its own Size plus the Size of the terrain it stands on.\nEffective Size determines which terrain blocks Line of Sight through Full Cover and Direct Cover (Part 7.1.1). Flying models are treated as having an Effective Size higher than any terrain piece on the table for Cover purposes (Part 7.1.4).",
      ko: '모형의 유효 크기는 자신의 크기 특성치에 해당 모형이 서 있는 지형의 크기를 더한 것과 같습니다(7.1.2 항목).\n지면에 있는 모형의 유효 크기는 자신의 크기 특성치와 같습니다. 고지대(크기 3 이상) 또는 중간 지대(크기 1~2)에 있는 모형은 자신의 크기에 해당 지형의 크기를 더합니다. 지형 기물이 고지대 또는 중간 지대 위에 놓이면 모형과 같은 방식으로 해당 지형의 유효 크기도 증가합니다.\n유효 크기는 완전 엄폐 및 직접 엄폐를 통해 어떤 지형이 시야를 차단하는지 결정합니다(7.1.1 항목). 엄폐를 판정할 때 공중 모형의 유효 크기는 전장에 있는 모든 지형 기물의 유효 크기보다 높은 것으로 취급합니다(7.1.4 항목).',
    },
  },
  {
    id: 'ELEVATION LEVEL',
    name: { en: 'ELEVATION LEVEL', ko: '고도' },
    definition: {
      en: 'Models can stand one of three elevations:\n• GROUND LEVEL: Standing directly on the playmat.\n• MID GROUND: Standing on horizontal terrain of Size 1 or 2.\n• HIGH GROUND: Standing on horizontal terrain of Size 3 or larger.\nThe model stands on Elevation if its base is at that elevation. If the model\'s base is on multiple elevation levels, assume it is standing on the highest of those elevations.',
      ko: '모형은 다음 세 가지 고도 중 하나에 있을 수 있습니다.\n지면: 플레이 매트 위에 직접 서 있는 상태.\n중간 지대: 크기 1 또는 크기 2의 수평 지형 위에 서 있는 상태.\n고지대: 크기 3 이상인 수평 지형 위에 서 있는 상태.\n모형의 베이스가 놓인 고도가 해당 모형의 고도입니다. 모형의 베이스가 둘 이상의 고도에 걸쳐 있다면, 그중 가장 높은 고도에 서 있는 것으로 간주합니다.',
    },
  },
  {
    id: 'ENEMY',
    name: { en: 'ENEMY', ko: '적' },
    definition: {
      en: 'All Units, Tokens, and cards belonging to the opponent are Enemies. In team games, all opposing players\' Units, Tokens, and cards are Enemies. A Unit may never target a Friendly Unit with an attack unless a rule explicitly states otherwise. Enemy is the opposite of Friendly and is referenced throughout the rules to determine valid targets, Engagement, and Mission Marker contests.',
      ko: '상대 플레이어에게 속한 모든 유닛, 토큰, 카드는 적입니다. 팀 게임에서는 상대 팀 플레이어들의 모든 유닛, 토큰, 카드가 적입니다. 규칙에 달리 명시되어 있지 않은 한 유닛은 아군 유닛을 공격 대상으로 지정할 수 없습니다. 적은 아군의 반대 개념이며, 유효한 공격 대상, 교전 및 임무 마커 경합을 결정할 때 사용합니다.',
    },
  },
  {
    id: 'ENGAGED',
    name: { en: 'ENGAGED', ko: '교전 중' },
    definition: {
      en: 'A Ground Unit is Engaged when any of its models is Within 1" (Engagement Range) of any model in an Enemy Ground Unit, provided the following conditions are met (Part 7.2.1):\n• Combat Tags match: Ground models Engage only Ground models. Flying models cannot be Engaged by any model.\n• Terrain does not block: Size 2+ terrain between the models prevents Engagement, even if they are Within 1". Models on HIGH GROUND cannot Engage models at GROUND LEVEL, and vice versa.\nWhen any model in a Unit is Engaged, the entire Unit is considered Engaged. An Engaged Unit cannot perform a standard Move - it must Disengage (Part 8.5.4) or Hold. Engaged Units are also subject to restrictions on Ranged Attacks (Part 8.7.3).',
      ko: '지상 유닛의 모형 하나라도 적 지상 유닛의 모형으로부터 1인치, 즉 교전 범위 이내에 들어온 상태로 다음 조건을 충족하면 교전 중이 됩니다(7.2.1 항목).\n전투 분류 조건: 지상 모형은 지상 모형과만 교전합니다. 공중 모형은 어떠한 모형과도 교전할 수 없습니다.\n지형에 의한 차단 없음: 모형 사이에 크기 2 이상의 지형이 있으면, 두 모형이 1인치 이내에 있더라도 교전할 수 없습니다. 고지대의 모형은 지면의 모형과 교전할 수 없으며, 그 반대도 마찬가지입니다.\n유닛의 모형 중 하나라도 교전 중 상태가 되면 유닛 전체가 교전 중 상태로 간주됩니다. 교전 중 유닛은 일반 이동을 수행할 수 없으며, 반드시 이탈(8.5.4 항목)하거나 위치 사수해야 합니다. 또한 교전 중 유닛은 원거리 공격에도 제한을 받습니다(8.7.3 항목).',
    },
  },
  {
    id: 'ENGAGEMENT RANGE',
    name: { en: 'ENGAGEMENT RANGE', ko: '교전 범위' },
    definition: {
      en: 'The Engagement Range extends 1" horizontally from any model\'s base. When two Enemy Ground models are Within each other\'s Engagement Range, they are Engaged (Part 7.2).\nEngagement Range is measured horizontally from a top-down perspective, ignoring vertical height (Part 4.1). It is referenced when resolving Move restrictions (Part 8.5.3), Disengage (Part 8.5.4), Charge (Part 8.6.2), the Fighting Rank (Part 8.8.1), and PLACE effects. Melee weapons list E as their Range, indicating they may only strike targets Within the Engagement Range.',
      ko: '교전 범위는 모든 모형의 베이스에서 수평으로 1인치까지 뻗습니다. 서로 적인 두 지상 모형이 상대의 교전 범위 이내에 들어오면 교전 중이 됩니다(7.2 항목).\n교전 범위는 수직 높이를 무시하고 위에서 내려다본 관점에서 수평으로 측정합니다(4.1 항목). 교전 범위는 이동 제한(8.5.3 항목), 이탈(8.5.4 항목), 돌격(8.6.2 항목), 전투열(8.8.1 항목) 및 배치 효과를 처리할 때 사용합니다. 근접전 무기는 사거리에 E가 표시되며, 이는 교전 범위 이내에 들어온 대상만 공격할 수 있다는 뜻입니다.',
    },
  },
  {
    id: 'ENTRY EDGE',
    name: { en: 'ENTRY EDGE', ko: '진입 경계' },
    definition: {
      en: 'The table edge assigned to a player by the Deployment Card. Units enter the battlefield from this edge when deploying from Reserves.',
      ko: '전장 카드가 각 플레이어에게 지정하는 테이블 가장자리입니다. 유닛은 예비 병력에서 전개할 때 이 경계를 통해 전장으로 진입합니다.',
    },
  },
  {
    id: 'EVADE ROLL',
    name: { en: 'EVADE ROLL', ko: '회피 굴림' },
    definition: {
      en: 'A defensive roll made in the Damage Pool step of an attack, performed only if the target Unit qualifies: either a Special Ability or keyword grants an Evade Roll, or the target is Engaged and suffering Damage from a Ranged Attack. The defender rolls all dice in the Damage Pool against the Unit\'s Evade characteristic; each die that meets or exceeds the Evade value is a success and is removed (Part 8.7.4).',
      ko: '공격의 피해 주사위 단계에서 하는 방어 굴림이며, 대상 유닛이 다음 중 하나에 해당할 때만 수행합니다.\n• 특수 능력이나 키워드를 통해 회피 굴림을 얻은 경우\n• 대상이 교전 중인 상태에서 원거리 공격으로 인해 피해를 입으려 할 경우\n조건을 충족한다면 방어자는 모든 피해 주사위를 굴립니다. 유닛의 회피 특성 이상인 결과는 성공이며 해당 주사위를 제거합니다. 남은 주사위는 확정 피해가 됩니다(8.7.4 항목).',
    },
  },
  {
    id: 'FACTION INDICATOR',
    name: { en: 'FACTION INDICATOR', ko: '진영 표시 마커' },
    definition: {
      en: 'A Marker used on Mission Markers to show which player currently controls that Mission Marker. Some Special Abilities also use Faction Indicators to mark an area of the battlefield (Part 7.3.2).',
      ko: '임무 마커 위에 두어 현재 어느 플레이어가 해당 임무 마커를 점령하고 있는지 표시하는 마커입니다. 일부 특수 능력은 전장의 특정 지역에 표시를 남기기 위해 진영 표시 마커를 사용하기도 합니다(7.3.2 항목).',
    },
  },
  {
    id: 'FACTION TAGS',
    name: { en: 'FACTION TAGS', ko: '진영 분류' },
    definition: {
      en: 'Faction Tags are keywords printed on Unit Cards, Tactical Cards, and Faction Cards that identify allegiance.\n• Race Tags: Terran, Zerg, Protoss.\n• Sub-Faction Tags: Specific broods or organisations, e.g., Kerrigan\'s Swarm, Raynor\'s Raiders.\n• Function: During Army Building, a player may include only Units and Tactical Cards whose Faction Tags all appear on the chosen Faction Card. If even one tag on the Unit or Tactical Card does not appear on the Faction Card, that card cannot be included. A Unit with fewer tags than the Faction Card is permitted- it only requires its own tags to be present (Part 9.1.2).',
      ko: '진영 분류는 유닛 카드, 전술 카드, 진영 카드에 표시되어 소속을 나타내는 키워드입니다.\n종족 분류: 테란, 저그, 프로토스.\n하위 진영 분류: 특정 무리나 조직(케리건의 군단, 레이너 특공대).\n기능: 병력을 편성할 때, 플레이어는 자신이 선택한 진영 카드에 표시된 진영 분류를 모두 만족하는 유닛과 전술 카드만 포함할 수 있습니다. 유닛 카드나 전술 카드에 표시된 분류 중 하나라도 진영 카드에 없는 것이 있다면, 해당 카드는 병력에 포함할 수 없습니다. 진영 카드에 표시된 분류보다 적은 분류를 가진 유닛의 경우, 자신이 가진 분류가 진영 카드에 있기만 하면 병력에 포함할 수 있습니다(9.1.2 항목).',
    },
  },
  {
    id: 'FIGHTING RANK',
    name: { en: 'FIGHTING RANK', ko: '전투열' },
    definition: {
      en: 'A model is in the Fighting Rank if it is Within the Engagement Range (1") of an Enemy model. Models in the Fighting Rank may strike with their Combat Phase weapons. See Part 8.8.1, Step 2.',
      ko: '모형이 적 모형의 교전 범위(1인치) 이내에 들어온 상태라면 전투열에 있습니다. 전투열에 있는 모형은 전투 단계 무기로 공격할 수 있습니다. 8.8.1 항목 2단계를 참조하십시오.',
    },
  },
  {
    id: 'FIRST PLAYER MARKER',
    name: { en: 'FIRST PLAYER MARKER', ko: '선공 마커' },
    definition: {
      en: 'A physical Token used to track which player has initiative. At the start of the game, the winner of the Roll-Off (Part 3.2) assigns the First Player Marker to either player for Round 1. The holder of the First Player Marker chooses which player activates first at the start of each Phase. The Marker changes hands in two ways: the first player to Pass during Phase 1 or Phase 2 takes the First Player Marker for the following Phase, and at the end of Phase 4 the Marker is awarded to the player with fewer Victory Points (Part 8.9.6). If Victory Points are tied, both players Roll-Off and the winner takes the Marker.',
      ko: '어느 플레이어가 주도권을 가지고 있는지 표시하는 물리적인 토큰입니다. 게임 시작 시 굴림 대결(3.2 항목)의 승자는 1라운드에 선공 마커를 어느 플레이어에게 줄지 결정합니다. 선공 마커를 가진 플레이어는 각 단계가 시작될 때 어느 플레이어가 먼저 활성화할지 결정합니다.\n마커는 다음 두 가지 방식으로 소유자가 바뀝니다. 1단계 또는 2단계에서 가장 먼저 패스한 플레이어가 다음 단계의 선공 마커를 가져가고, 4단계 종료 시 승점이 더 적은 플레이어가 선공 마커를 가져갑니다(8.9.6 항목). 승점이 같다면 양 플레이어가 굴림 대결을 하고 승자가 마커를 가져갑니다.',
    },
  },
  {
    id: 'FLYING',
    name: { en: 'FLYING', ko: '공중' },
    definition: {
      en: "Flying Units trade board control (no Mission Markers, no melee) for mobility and immunity to terrain.\n• A Flying Unit ignores all terrain for movement purposes. The Leading Model moves point-to-point, measuring horizontally. Other models may pass through a Flying model's base as if it were not there, and vice versa.\n• A Flying Unit is never Engaged. Ground models cannot Engage Flying models, and Flying models cannot Engage other Flying models. A Flying Unit must end its movement at least 1\" away from all Enemy Flying Units.\n• Flying model, ignore the Full Cover rule. Direct Cover and the Elevation Dead Zone rules still apply. Assume that Flying Units' Effective Size is higher than the Effective Size of any terrain piece on the table.\n• A Flying Unit does not benefit from HIGH GROUND Cover (Part 7.1.3).\n• A Flying Unit cannot Control or Contest Mission Markers (overrides Parts 6.2 and 8.9.1).\n• A Flying Unit cannot Charge or be Charged.\n• A Flying Unit cannot participate in the Combat Phase (Part 8.8).\n• A Flying Unit ignores elevation. It does not use Access Points. For Cover and Line of Sight purposes, treat a Flying unit's Effective Size as higher than the Effective Size of any terrain piece on the table (Part 7.1.4). Terrain does not contribute to a Flying model's Effective Size.\n• A Flying Unit moving over Grass does not destroy the Grass terrain piece. If a Flying Unit ends on a Grass terrain piece, it is removed as normal.",
      ko: '공중 유닛은 기동성이 뛰어나고 지형의 영향을 받지 않는 대신 전장 장악 능력을 포기합니다. 즉, 임무 마커를 점령하거나 경합할 수 없고 근접전에 참여할 수 없습니다.\n• 공중 유닛은 이동할 때 모든 지형을 무시합니다. 대표 모형은 수평 거리만 측정하여 한 지점에서 다른 지점으로 이동합니다. 다른 모형은 공중 모형의 베이스가 없는 것처럼 그 베이스를 통과할 수 있으며, 공중 모형도 다른 모형의 베이스를 같은 방식으로 통과할 수 있습니다.\n• 공중 유닛은 절대 교전 중이 되지 않습니다. 지상 모형은 공중 모형과 교전할 수 없으며, 공중 모형도 다른 공중 모형과 교전할 수 없습니다. 공중 유닛은 이동을 종료할 때 모든 적 공중 유닛으로부터 최소 1인치 떨어져 있어야 합니다.\n• 공중 모형은 완전 엄폐 규칙을 무시합니다. 직접 엄폐와 고도 사각지대 규칙은 여전히 적용됩니다. 엄폐를 판정할 때 공중 유닛의 유효 크기는 전장에 있는 모든 지형 기물의 유효 크기보다 높은 것으로 간주합니다.\n• 공중 유닛은 고지대 엄폐의 혜택을 받지 않습니다(7.1.3 항목).\n• 공중 유닛은 임무 마커를 점령하거나 경합할 수 없습니다(6.2 및 8.9.1 항목보다 우선).\n• 공중 유닛은 돌격할 수도, 돌격의 대상이 될 수도 없습니다.\n• 공중 유닛은 전투 단계에 참여할 수 없습니다(8.8 항목).\n• 공중 유닛은 고도를 무시하며 출입구를 사용하지 않습니다. 지형의 크기는 공중 모형의 유효 크기에 더하지 않습니다(7.1.4 항목).\n• 공중 유닛이 수풀 위를 지나가도 수풀 지형 기물은 제거되지 않습니다. 공중 유닛이 수풀 위에서 이동을 종료하면 정상적으로 해당 수풀을 제거합니다.',
    },
  },
  {
    id: 'FRIENDLY',
    name: { en: 'FRIENDLY', ko: '아군' },
    definition: {
      en: "All Units, Tokens, and cards belonging to the Controlling Player are Friendly to one another. In team games, all teammates' Units, Tokens, and cards are also Friendly. A Unit's own models are always Friendly to it. Friendly is the opposite of Enemy and is used throughout the rules to determine targeting restrictions, movement interactions, and ability eligibility.",
      ko: '조종 플레이어에게 속한 모든 유닛, 토큰, 카드는 서로 아군입니다. 팀 게임에서는 팀원의 모든 유닛, 토큰, 카드도 아군입니다. 유닛 자신의 모형은 항상 해당 유닛에게 아군입니다. 아군은 적의 반대 개념이며, 대상 지정 제한, 이동 상호작용 및 능력의 사용 가능 여부를 결정할 때 사용합니다.',
    },
  },
  {
    id: 'GAP CLEARANCE',
    name: { en: 'GAP CLEARANCE', ko: '틈새 통과' },
    definition: {
      en: 'A gap is any physical space between terrain pieces or models through which a model\'s path of movement passes. The Leading Model can pass through a gap depending on the Unit\'s Size: Size 2 or lower requires a gap at least 1" wide; Size 3 or larger requires a gap at least 3" wide. This applies to Move, Run, Charge, Disengage, and Close Ranks. Flying Units ignore Gap Clearance during movement (Part 4.6).',
      ko: '틈새는 지형 기물 또는 모형 사이에 존재하며, 모형의 이동 경로가 통과하는 물리적 공간입니다. 대표 모형이 통과할 수 있는 틈새의 크기는 유닛의 크기에 따라 달라집니다.\n크기 2 이하: 폭이 최소 1인치인 틈새를 통과할 수 있습니다.\n크기 3 이상: 폭이 최소 3인치인 틈새가 필요합니다.\n틈새 통과 조건을 충족하더라도 모형의 베이스가 물리적으로 들어맞지 않는 위치에는 모형을 놓을 수 없습니다. 이 규칙은 이동, 질주, 돌격, 이탈, 대열 정비 등 모든 이동 유형에 적용됩니다. 공중 유닛은 이동 중 틈새 통과 규칙을 무시합니다(4.6 항목).',
    },
  },
  {
    id: 'GRASS',
    name: { en: 'GRASS', ko: '수풀' },
    definition: {
      en: "A terrain piece with a Size of 2 that follows special rules. Unlike other Size 2 terrain, Grass does not block movement but does block Line of Sight, following the standard Cover rules (Part 7.1.1).\nGrass is destroyed by the passage of war. If a Leading Model's path of travel passes through or any model of a Unit ends on a Grass terrain piece during any movement action (Move, Deploy, Run, Charge, Disengage or Close Ranks), that Grass terrain piece is immediately removed from the game. It does not return during Cleanup & Refresh and cannot be replaced by any means.\nA Flying Unit moving over Grass does not destroy the Grass terrain piece. Flying models pass above the terrain, not through it. If any model of a Flying Unit ends on a Grass terrain piece, it is removed as normal.",
      ko: '특수 규칙을 따르는 크기 2 지형입니다. 수풀은 다른 크기 2 지형과 달리 이동을 막지는 않지만 일반적인 엄폐 규칙(7.1.1 항목)에 따라 시야를 차단합니다.\n수풀은 교전이 진행되며 파괴됩니다. 대표 모형의 이동 경로가 수풀을 통과하거나 이동, 전개, 질주, 돌격, 이탈 또는 대열 정비 행동 중 유닛의 모형 하나라도 수풀 위에서 이동을 끝내면 해당 수풀 지형 기물을 즉시 게임에서 제거합니다. 해당 수풀은 정리 및 갱신 중 돌아오지 않으며 어떠한 방법으로도 다시 놓을 수 없습니다.\n공중 유닛이 수풀 위를 지나 이동해도 수풀은 제거되지 않습니다. 공중 유닛의 모형 하나라도 수풀 위에서 이동을 끝내면 해당 수풀은 정상적으로 제거됩니다.',
    },
  },
  {
    id: 'GROUND LEVEL',
    name: { en: 'GROUND LEVEL', ko: '지면' },
    definition: {
      en: 'One of the elevation levels. Model is on the GROUND LEVEL when it is standing directly on the playmat.\nModels on GROUND LEVEL cannot Engage models on HIGH LEVEL, and vice versa. Models on GROUND LEVEL can Engage models on MID GROUND only if both models are adjacent to the same ACCESS POINT connecting their respective elevations.\nA model at GROUND LEVEL has an Effective Size equal to its own Size characteristic only.',
      ko: '고도 중 하나입니다. 모형이 플레이 매트 위에 직접 서 있으면 지면에 있습니다.\n지면의 모형은 고지대의 모형과 교전할 수 없으며, 그 반대도 마찬가지입니다. 지면의 모형은 양쪽 모형이 각자의 고도를 연결하는 같은 출입구에 인접해 있을 때만 중간 지대의 모형과 교전할 수 있습니다.\n지면에 있는 모형의 유효 크기는 자신의 크기 특성과 같습니다.',
    },
  },
  {
    id: 'HEAL (X)',
    name: { en: 'HEAL (X)', ko: '치유(X)' },
    definition: {
      en: "Remove X points of accumulated Damage from the Unit (reduce its Damage Marker accordingly). HEAL cannot return Destroyed models - it only reduces existing Damage. See also: RESPAWN.",
      ko: '유닛에 누적된 피해를 X점 제거합니다(그에 맞춰 피해 마커의 수치도 감소시킵니다). 치유는 파괴된 모형을 복귀시킬 수는 없습니다. 이미 누적된 피해만 감소시킵니다. 재생성도 참고하십시오.',
    },
  },
  {
    id: 'HIDDEN',
    name: { en: 'HIDDEN', ko: '은신' },
    definition: {
      en: 'This Unit cannot be selected as the target of a Ranged Attack or any LoS-requiring Special Ability unless the acting model is Within 4" of it. A HIDDEN Unit is immune to the IMPACT keyword. A HIDDEN Unit may make an Evade Roll against every attack targeting it.\n• HIDDEN is classified as a Status.',
      ko: '행동하는 모형이 이 유닛의 4인치 이내에 들어온 상태가 아니라면, 이 유닛은 원거리 공격이나 시야가 필요한 특수 능력의 대상으로 선택될 수 없습니다. 은신 유닛은 충격 키워드에 면역입니다. 은신 유닛은 자신을 대상으로 하는 모든 공격에 대해 회피 굴림을 할 수 있습니다.\n은신은 상태로 분류합니다.',
    },
  },
  {
    id: 'HIGH GROUND',
    name: { en: 'HIGH GROUND', ko: '고지대' },
    definition: {
      en: 'One of the elevation levels. Model is on the HIGH GROUND when standing on horizontal terrain of Size 3 or larger.\nModels on HIGH GROUND cannot Engage models on GROUND LEVEL, and vice versa. Models on HIGH GROUND can Engage models on MID GROUND only if both models are adjacent to the same ACCESS POINT connecting their respective elevations.\nA model on HIGH GROUND has an Effective Size equal to its own Size plus the terrain\'s Size.',
      ko: '고도 중 하나입니다. 모형이 크기 3 이상인 수평 지형 위에 서 있으면 고지대에 있는 것입니다.\n고지대의 모형은 지면의 모형과 교전할 수 없으며, 그 반대도 마찬가지입니다. 고지대의 모형은 양쪽 모형이 각자의 고도를 연결하는 동일한 출입구에 인접해 있을 때만 중간 지대의 모형과 교전할 수 있습니다.\n고지대의 모형은 자신의 크기에 지형의 크기를 더한 유효 크기를 가집니다.',
    },
  },
  {
    id: 'HITS X (Y)',
    name: { en: 'HITS X (Y)', ko: '명중 X(Y)' },
    definition: {
      en: 'The affected Unit suffers X automatic hits. Set X dice directly into the Armour Pool and proceed immediately to Armour Rolls (Part 8.7.4, Steps 3–4). Treat the Damage characteristic as Y. These hits do not generate Surge.',
      ko: '영향을 받은 유닛은 자동 명중 X회를 받습니다. 주사위 X개를 방어 주사위에 바로 추가하고 즉시 방어 굴림으로 진행합니다(8.7.4 항목, 3~4단계). 피해 특성치는 Y로 취급합니다. 이 명중은 상성을 발생시키지 않습니다.',
    },
  },
  {
    id: 'IMPACT (X) Y',
    name: { en: 'IMPACT (X) Y', ko: '충격(X) Y' },
    definition: {
      en: 'Immediately after this Unit completes a successful Charge, check every model in the Fighting Rank or Supporting Rank. For each eligible model, generate X Impact Dice:\n• If the model is in the Fighting Rank or Supporting Rank against only one Enemy Unit, all X dice go to that Unit.\n• If the model is in the Fighting Rank or Supporting Rank against multiple Enemy Units, the controlling player may split the dice between those Units.\nRoll the allocated dice for each target Unit separately (this is the Impact Hit Roll). For each result of Y or higher, set 1 die into the target\'s Armour Pool. Proceed immediately to Armour Rolls. These hits do not generate Surge and treat Damage as 1.',
      ko: '이 유닛이 돌격에 성공한 직후 전투열 또는 지원열에 있는 모든 모형을 확인합니다. 조건을 충족하는 각 모형마다 충격 주사위 X개를 생성합니다.\n• 해당 모형이 하나의 적 유닛에 대해서만 전투열 또는 지원열에 있다면 X개의 주사위를 모두 해당 유닛에 할당합니다.\n• 해당 모형이 여러 적 유닛에 대해 전투열 또는 지원열에 있다면 조종 플레이어는 주사위를 해당 유닛들에게 나누어 할당할 수 있습니다.\n각 대상 유닛에 할당한 주사위를 별도로 굴립니다. 이것이 충격 명중 굴림입니다. Y 이상인 결과 하나당 방어 주사위 1개를 생성하고 즉시 방어 굴림을 진행합니다. 이 명중은 상성을 발생시키지 않으며 피해를 1로 취급합니다.',
    },
  },
  {
    id: 'IMPASSABLE TERRAIN',
    name: { en: 'IMPASSABLE TERRAIN', ko: '통과 불가 지형' },
    definition: {
      en: 'A terrain piece is Impassable if it has no Access Point connecting it to an adjacent elevation level. Models cannot move through, onto, or across IMPASSABLE TERRAIN, and no model may end its movement overlapping it. Models can move through Terrain of Sizes 0 and 1.',
      ko: '인접한 고도와 연결되는 출입구가 없는 지형 기물은 통과 불가 지형입니다. 모형은 통과 불가 지형을 통과하거나, 그 위로 올라가거나, 가로질러 이동할 수 없으며 해당 지형과 겹친 상태로 이동을 끝낼 수도 없습니다. 모형은 크기 0 및 크기 1 지형을 통과하여 이동할 수 있습니다.',
    },
  },
  {
    id: 'INDIRECT FIRE',
    name: { en: 'INDIRECT FIRE', ko: '곡사' },
    definition: {
      en: 'Ranged Attacks with this weapon may ignore Line of Sight when selecting a target and resolving Damage. The target must still be Within Range. If the target is not within Line of Sight, it may make an Evade Roll against this attack.',
      ko: '이 무기로 하는 원거리 공격은 대상을 선택하고 피해를 처리할 때 시야를 무시할 수 있습니다. 대상은 여전히 사거리 이내에 들어와 있어야 합니다. 대상이 시야 안에 있지 않다면, 해당 공격에 대해 회피 굴림을 할 수 있습니다.',
    },
  },
  {
    id: 'INSTANT',
    name: { en: 'INSTANT', ko: '반응 불가' },
    definition: {
      en: 'Enemy Units cannot declare or resolve Reaction abilities in response to attacks made with this weapon.',
      ko: '이 무기로 수행한 공격에 대응하여 적 유닛은 반응형 능력을 선언하거나 처리할 수 없습니다.',
    },
  },
  {
    id: 'LEADING MODEL',
    name: { en: 'LEADING MODEL', ko: '대표 모형' },
    definition: {
      en: "The Leading Model is a temporary reference point used to execute a Unit's movement. Whenever a Unit performs a Move, Deploy, Run, Charge, Disengage, Close Ranks, or any action that instructs the Unit to nominate a Leading Model, the Controlling Player selects one model in the Unit.\nMove the Leading Model first, measuring its exact path. Then set the remaining models in valid Coherency around the Leading Model's new position (Part 4.4). The Leading Model nomination ends once the action resolves. The Leading Model determines the Unit's Gap Clearance category and interacts with terrain restrictions (Part 4.6).",
      ko: '대표 모형은 유닛이 이동할 때 기준점으로 삼기 위해 일시적으로 지정하는 모형입니다. 유닛이 이동, 전개, 질주, 돌격, 이탈, 대열 정비 또는 대표 모형을 지정하도록 지시하는 행동을 수행할 때마다 조종 플레이어는 해당 유닛의 모형 하나를 대표 모형으로 선택합니다.\n먼저 정확한 이동 경로를 측정하며 대표 모형을 이동시킵니다. 이후 나머지 모형을 대표 모형의 새 위치 주위에서 적법한 대형을 유지하도록 놓습니다(4.4 항목). 행동의 처리가 끝나면 대표 모형 지정도 끝납니다. 대표 모형은 해당 유닛의 틈새 통과 범주를 결정하며 지형 제한과 상호작용합니다(4.6 항목).',
    },
  },
  {
    id: 'LINE OF SIGHT (LoS)',
    name: { en: 'LINE OF SIGHT (LoS)', ko: '시야' },
    definition: {
      en: "Line of Sight determines what a model can see and, by extension, what it can target with attacks and abilities.\nAll Line of Sight checks are resolved from a 2D top-down perspective, looking directly down at the battlefield from above. To determine if a model can see a target, trace an imaginary straight line from any part of the acting model's base to any part of the target model's base. Vertical height is never factored into the trace.\nIf the trace does not pass through any Blocking Terrain (any terrain piece with an Effective Size of 1 or greater), the target is Visible. No further checks are required.\nIf the trace passes through Blocking Terrain, the target is not automatically hidden. Apply the Cover rules (Part 7.1.1) to determine whether that terrain actually blocks the Line of Sight:\n• Full Cover: The terrain's Effective Size is equal to or greater than the Effective Size of both the attacker and the target. Line of Sight is blocked.\n• Direct Cover: The trace passes through a terrain piece, and either the attacker or the target is Within 1\" of that terrain, provided the terrain's Effective Size is equal to or greater than the Effective Size of the model that is Within 1\". Line of Sight is blocked. Exception: If both the attacker and the target are Within 1\" of the same terrain piece and Within 3\" of each other, resolve Line of Sight normally.\n• Elevation Dead Zone: A model on HIGH GROUND (Size 3+) cannot see a model at GROUND LEVEL that is Within 1\" of the base of the same terrain piece, and vice versa. The same Close Quarters exception applies.\nEach terrain piece is assessed independently. Terrain pieces do not combine their Effective Size or proximity. If no single terrain piece meets the requirements for Full Cover or Direct Cover, Line of Sight is not blocked, regardless of how many terrain pieces the trace passes through.\nA terrain piece's footprint is defined by its physical base or outermost edges viewed from above. Gaps, windows, doorways, and open interiors within the footprint do block the Line of Sight unless players agree otherwise during Battlefield Setup (Part 7.1).\nFlying models ignore the Full Cover rule. Direct Cover and the Elevation Dead Zone still apply. Treat a Flying model's Effective Size as higher than the Effective Size of any terrain piece on the table (Part 7.1.4).\nLine of Sight is mutual: if Model A can see Model B, Model B can see Model A through the same trace.",
      ko: '시야는 모형이 무엇을 볼 수 있는지, 그리고 무엇을 공격이나 능력의 대상으로 지정할 수 있는지를 결정합니다.\n모든 시야 판정은 전장을 바로 위에서 내려다보는 시점에서 처리합니다. 행동하는 모형이 대상을 볼 수 있는지 확인하려면, 행동하는 모형의 베이스 임의의 지점에서 대상 모형의 베이스 임의의 지점까지 가상의 직선을 긋습니다. 수직 높이는 이 선을 그을 때 고려하지 않습니다.\n이 선이 엄폐물, 즉 유효 크기가 1 이상인 지형 기물을 통과하지 않는다면 대상은 보이는 상태입니다. 선이 엄폐물을 통과하더라도 대상이 자동으로 보이지 않게 되는 것은 아닙니다. 엄폐 규칙(7.1.1 항목)을 확인해 해당 지형이 실제로 시야를 차단하는지 판정합니다.\n완전 엄폐: 지형의 유효 크기가 공격자와 대상 모두의 유효 크기 이상이면 시야가 차단됩니다.\n직접 엄폐: 시야선이 지형 기물을 통과하고 공격자 또는 대상 중 하나가 해당 지형의 1인치 이내에 들어온 상태라면, 지형의 유효 크기가 그 1인치 이내에 들어온 모형의 유효 크기 이상일 때 두 모형 사이의 시야가 차단됩니다. 예외: 공격자와 대상이 같은 지형 기물의 1인치 이내에 들어온 상태이며 동시에 서로의 3인치 이내에 들어온 상태라면 직접 엄폐를 적용하지 않고 일반적인 시야 규칙으로 판정합니다.\n고도 사각지대: 고지대(크기 3 이상)에 있는 모형이 자신이 서 있는 같은 지형 기물의 베이스에서 1인치 이내에 들어온 지면의 모형에게 시야선을 그을 경우 시야가 차단됩니다. 이 규칙은 양방향으로 적용됩니다. 위의 근접 거리 예외도 동일하게 적용합니다.\n각 지형 기물은 엄폐 여부를 개별적으로 판정합니다. 여러 지형 기물의 유효 크기나 거리 조건을 합산하지 않습니다. 지형 기물의 범위는 실제 베이스 또는 위에서 내려다보았을 때의 가장 바깥쪽 경계를 기준으로 정합니다. 전장 준비 중 플레이어들이 별도로 합의하지 않는 한, 지형 범위 안의 틈, 창문, 문, 열린 내부 공간도 시야를 차단합니다.\n공중 모형은 완전 엄폐를 무시합니다. 직접 엄폐와 고도 사각지대 규칙은 여전히 적용됩니다(7.1.4 항목).\n시야는 상호적입니다. 모형 A가 모형 B를 볼 수 있다면, 같은 시야선을 따라 모형 B도 모형 A를 볼 수 있습니다.',
    },
  },
  {
    id: 'LOCKED IN (X)',
    name: { en: 'LOCKED IN (X)', ko: '정지 사격(X)' },
    definition: {
      en: 'When making a Ranged Attack with this weapon, add X to its RoA if the target Unit has Stationary Status.',
      ko: '이 무기로 원거리 공격을 할 때 대상 유닛이 정지한 상태라면 해당 무기의 타수에 X회를 더합니다.',
    },
  },
  {
    id: 'LONG RANGE (X)',
    name: { en: 'LONG RANGE (X)', ko: '장거리 사격(X)' },
    definition: {
      en: 'The maximum Range of this weapon increases to X".\nMeasure each attacking model\'s distance to the target individually:\n• Within normal profile Range: attack resolves normally.\n• Beyond profile Range but Within X": the model suffers a -1 Modifier to its Hit roll.\nIf a Batch contains models at both Standard and Long Range, generate the total dice but roll the two groups separately to account for different Hit Target Numbers.',
      ko: '이 무기의 최대 사거리가 X인치로 증가합니다. 각 공격 모형에서 대상까지의 거리를 개별적으로 측정합니다.\n기본 무기 프로필의 사거리 이내에 들어온 상태: 일반적인 절차대로 공격합니다.\n기본 사거리보다 멀지만 X인치 이내에 들어온 상태: 해당 모형의 명중 굴림에 -1 수정치를 적용합니다.\n하나의 묶음에 기본 사거리 이내에서 공격하는 모형과 장거리 사격으로 공격하는 모형이 모두 포함되어 있다면 전체 수만큼의 공격 주사위를 생성하되, 서로 다른 명중 난이도 수치를 적용할 수 있도록 두 집단을 나눠서 굴립니다.',
    },
  },
  {
    id: 'MID GROUND',
    name: { en: 'MID GROUND', ko: '중간 지대' },
    definition: {
      en: 'One of the elevation levels. Model is on the MID GROUND when standing on horizontal terrain of Size 1 or 2.\nModels on MID GROUND can Engage models on HIGH GROUND or GROUND LEVEL only if both models are adjacent to the same ACCESS POINT connecting their respective elevations.\nA model on MID GROUND has an Effective Size equal to its own Size plus the terrain\'s Size.',
      ko: '고도 중 하나입니다. 모형이 크기 1 또는 2인 수평 지형 위에 서 있으면 중간 지대에 있습니다.\n중간 지대의 모형은 양쪽 모형이 각자의 고도를 연결하는 같은 출입구에 인접해 있을 때만 고지대 또는 지면의 모형과 교전할 수 있습니다.\n중간 지대의 모형은 자신의 크기에 지형의 크기를 더한 것과 같은 유효 크기를 가집니다.',
    },
  },
  {
    id: 'MISSION MARKERS',
    name: { en: 'MISSION MARKERS', ko: '임무 마커' },
    definition: {
      en: 'Numbered Markers are set on the battlefield during Setup at the coordinates shown on the Deployment Card. Each Marker is 32mm in diameter and has two sides: Activated or Deactivated. Markers 1 & 3 are Red, Markers 2 & 4 are Blue, and Marker 5 is Neutral.\nMission Markers are the primary scoring mechanism. At the end of each Round, players determine Control of each Marker by comparing the Total Current Supply Value of their eligible contesting Units (Part 8.9.1). A Unit may Contest a Mission Marker only if it is on the battlefield, In Coherency, and has at least one model Within 3" with Line of Sight to the Marker on the same elevation. Flying Units and BURROWED Units cannot Contest or Control Mission Markers.\nControl is Sticky- once a player Controls a Marker, it remains under their control until the opponent reclaims it with a higher contesting Supply total. A tied result never transfers control.',
      ko: '번호가 적힌 마커는 게임 준비 중 전장 카드에 표시된 좌표에 놓습니다. 각 마커의 지름은 32mm입니다. 한쪽 면은 활성화 상태를, 다른 쪽 면은 비활성화 상태를 나타냅니다. 1번과 3번 마커는 적색, 2번과 4번 마커는 청색, 5번 마커는 중립입니다.\n임무 마커는 게임의 주요 득점 수단입니다. 각 라운드 종료 시, 플레이어는 해당 마커를 경합할 자격이 있는 자신의 유닛의 현재 최종 인구수 수치를 비교하여 점령권을 결정합니다(8.9.1 항목). 유닛이 임무 마커를 경합하려면 전장에 있어야 하고, 대형 유지 상태여야 하며, 같은 고도에서 마커에 시야가 있는 모형 하나 이상이 마커의 3인치 이내에 들어온 상태여야 합니다. 공중 유닛과 잠복 유닛은 임무 마커를 경합하거나 점령할 수 없습니다.\n점령 상태 유지: 한번 플레이어가 임무 마커를 점령하면 상대가 더 높은 인구수 총합으로 경합해 탈환할 때까지 해당 플레이어의 점령 상태가 유지됩니다. 경합 결과가 같다면 점령권은 바뀌지 않습니다.',
    },
  },
  {
    id: 'MODIFIER',
    name: { en: 'MODIFIER', ko: '수정치' },
    definition: {
      en: 'A Modifier adjusts the Target Number of a roll. Apply all Modifiers before rolling (Part 3.4).\n• +X Modifier: Makes the roll easier by reducing the Target Number by X.\n• -X Modifier: Makes the roll harder by increasing the Target Number by X.\nModifiers from different named sources are cumulative unless otherwise stated. A Target Number can never be modified below 2+ or above 6+. Modifiers adjust the Target Number, not the dice result. A natural roll of 6 always succeeds, and a natural roll of 1 always fails, regardless of Modifiers (Part 3.6).\nA Modifier is distinct from a Fixed Addition (Part 3.5), which generates a value rather than adjusting a Target Number.',
      ko: '수정치는 굴림의 난이도 수치를 조정합니다. 모든 수정치는 주사위를 굴리기 전에 적용합니다(3.4 항목).\n+X 수정치: 굴림을 더 쉽게 만들며, 난이도 수치를 X만큼 감소시킵니다.\n-X 수정치: 굴림을 더 어렵게 만들며, 난이도 수치를 X만큼 증가시킵니다.\n달리 명시되지 않는 한, 서로 다른 명칭의 출처에서 발생한 수정치는 누적됩니다. 난이도 수치는 2+ 미만으로 낮아지거나 6+를 초과하여 높아질 수 없습니다. 수정치는 주사위 결과 자체가 아니라 난이도 수치를 변경합니다. 수정치와 관계없이, 주사위의 자연 결과가 6이면 항상 성공하고 자연 결과가 1이면 항상 실패합니다(3.6 항목).\n수정치는, 난이도 수치를 조정하는 것이 아니라 새로운 수치를 생성하는 고정 추가치(3.5 항목)와는 다릅니다.',
    },
  },
  {
    id: 'Morph (Name)',
    name: { en: 'Morph (Name)', ko: '변형(유닛 이름) X' },
    definition: {
      en: 'The controlling player must have sufficient Available Supply. Set one (Name) model in Base-to-Base contact with a model from the active Unit, then remove that model from the battlefield. The (Name) model forms a new Unit and cannot be set Within 1" of any Enemy Unit. Place an Activation Marker next to the new Unit; it cannot be Activated for the remainder of the Round.',
      ko: '이 능력을 수행하려면 조종 플레이어에게 충분한 잔여 보급품이 있어야 합니다. 지정된 유닛의 모형 1개를 활성화된 유닛의 모형과 베이스 접촉하도록 놓은 뒤, 활성화된 유닛에 속한 모형 X개를 전장에서 제거합니다. 새로 놓은 모형은 새로운 유닛을 구성하며 적 유닛의 1인치 범위 이내에 놓을 수 없습니다. 새 유닛 옆에 활성화 마커를 놓습니다. 이 유닛은 남은 라운드 동안 활성화할 수 없습니다.',
    },
  },
  {
    id: 'NON-LETHAL DAMAGE (X)',
    name: { en: 'NON-LETHAL DAMAGE (X)', ko: '비살상 피해(X)' },
    definition: {
      en: "The Unit suffers X points of Damage. Add this amount effectively to the Unit's Damage Marker. Do not remove any models, even if Total Damage exceeds a model's HP. If the Unit subsequently suffers standard Damage, the combined Total Damage triggers casualty removal normally.",
      ko: '유닛은 피해 X점을 받습니다. 이 수치를 유닛의 피해 마커에 더합니다. 최종 피해가 모형의 체력을 초과하더라도 모형을 제거하지 않습니다. 이후 유닛이 일반 피해를 받는다면, 합산된 최종 피해를 기준으로 정상적으로 사상자를 제거합니다.',
    },
  },
  {
    id: 'ON CREEP',
    name: { en: 'ON CREEP', ko: '점막 위' },
    definition: {
      en: 'A Friendly or Enemy Ground Zerg Unit is considered to be ON CREEP while it is Within 6" of any Creep Tumor Token or any model designated as a Source of Creep. While satisfying this condition, the Unit gains the ON CREEP keyword. This allows the Unit to trigger specific Special Abilities or Upgrades that require this state.',
      ko: '아군 또는 적 지상 저그 유닛이 점막 종양 토큰이나 점막 생성원으로 지정된 모형의 6인치 이내에 들어온 상태인 동안 해당 유닛은 점막 위에 있는 것으로 간주합니다. 이 조건을 충족하는 동안 해당 유닛은 점막 위 키워드를 얻습니다. 이를 통해 점막 위 상태를 요구하는 특정 특수 능력이나 업그레이드를 사용할 수 있습니다.',
    },
  },
  {
    id: 'PIERCE [TAG] X',
    name: { en: 'PIERCE [TAG] X', ko: '[분류](X) 관통' },
    definition: {
      en: "When attacking a Unit with the specified Combat Tag, treat this weapon's Damage characteristic as X.",
      ko: '지정된 전투 분류를 가진 유닛을 공격할 때, 이 무기의 피해 특성을 X로 취급합니다.',
    },
  },
  {
    id: 'PINPOINT',
    name: { en: 'PINPOINT', ko: '저격' },
    definition: {
      en: 'Ranged Attacks with this weapon may target Engaged Enemy Units, ignoring the standard Engagement Status restriction (overrides Part 8.7.3, Step 1).',
      ko: '이 무기로 하는 원거리 공격은 교전 상태에 따른 일반적인 제한을 무시하고, 교전 중인 적 유닛을 대상으로 지정할 수 있습니다(8.7.3 항목, 1단계보다 우선).',
    },
  },
  {
    id: 'PLACE (X)',
    name: { en: 'PLACE (X)', ko: '배치(X)' },
    definition: {
      en: 'Choose a Leading Model. Remove it and set it Wholly Within X" of its starting position. Then remove and replace all other models in the Unit, maintaining Coherency (Part 4.4). PLACE ignores Gap Clearance, and elevation requirements. The Leading Model is removed and set directly, not moved along a path. However, they must end in a legal position and not Within the Engagement Range of any enemy model. Models using the PLACE effect during the Assault Phase may be set Within the Engagement Range of Enemy models (the Unit becomes Engaged) unless stated otherwise.',
      ko: '대표 모형을 선택합니다. 해당 모형을 제거한 뒤 시작 위치의 X인치 이내에 완전히 들어온 상태로 놓습니다. 이후 유닛의 다른 모든 모형도 제거한 뒤 대형을 유지하도록 다시 놓습니다(4.4 항목). 배치는 틈새 통과 및 고도 요구 사항을 무시합니다. 대표 모형은 이동 경로를 따라 이동하는 것이 아니라 제거된 뒤 새 위치에 직접 놓입니다. 다만 적법한 위치에 놓아야 하며 적 모형의 교전 범위 이내에 들어온 상태가 될 수 없습니다.\n공세 단계 중 배치 효과를 사용하는 모형은 적 모형의 교전 범위 이내에 들어온 상태로 놓을 수 있습니다. 이 경우 해당 유닛은 교전 중이 됩니다.',
    },
  },
  {
    id: 'PRECISION (X)',
    name: { en: 'PRECISION (X)', ko: '정밀(X)' },
    definition: {
      en: 'After rolling to Hit, move up to X failed Attack Dice directly into the Armour Pool. Treat them as successful Hits for all purposes, including Surge.',
      ko: '명중 굴림을 한 뒤 실패한 공격 주사위 중 최대 X개를 방어 주사위로 바로 옮깁니다. 해당 주사위는 상성을 포함한 모든 규칙에서 성공한 명중으로 취급합니다.',
    },
  },
  {
    id: 'READY',
    name: { en: 'READY', ko: '준비' },
    definition: {
      en: 'The default state of a Tactical Card or Faction Card. A Ready card is face-up, its abilities are available, and it may be Exhausted to pay resource costs or activate its Special Abilities. All Tactical Cards and Faction Cards begin each Round in the Ready state. Cards that have been Exhausted are returned to Ready during Cleanup & Refresh (Part 8.9.5).',
      ko: '전술 카드 또는 진영 카드의 기본 상태입니다. 준비 상태인 카드는 앞면이 보이도록 놓으며, 카드의 능력을 사용할 수 있고, 자원 비용을 지불하거나 카드의 특수 능력을 활성화하기 위해 소모할 수 있습니다. 모든 전술 카드와 진영 카드는 매 라운드를 준비 상태로 시작합니다. 소모 상태인 카드는 정리 및 갱신(8.9.5 항목) 중 준비 상태로 돌아갑니다.',
    },
  },
  {
    id: 'REPEATABLE',
    name: { en: 'REPEATABLE', ko: '반복 가능' },
    definition: {
      en: 'This ability is exempt from the Once Per Round limit (Part 2.7.1). It may be used multiple times per Round and per Activation, provided all Costs and trigger conditions are met each time.',
      ko: '이 능력은 라운드당 1회 제한에서 제외됩니다(2.7.1 항목). 사용할 때마다 모든 비용을 지불하고 발동 조건을 충족한다면 라운드당 및 활성화당 여러 번 사용할 수 있습니다.',
    },
  },
  {
    id: 'RESERVES',
    name: { en: 'RESERVES', ko: '예비 병력' },
    definition: {
      en: 'A holding area off the battlefield where Units remain until they are deployed. All Units begin the game in Reserves.\nWhile in Reserves, a Unit:\n• Cannot be targeted by attacks or abilities unless an ability explicitly states it affects Units in Reserves.\n• Cannot use Active Abilities, Passive Abilities, or Reaction Abilities unless the ability explicitly states otherwise.\n• Cannot Control or Contest Mission Markers.\n• Does not contribute its Current Supply Value to the player\'s Total Current Supply on the battlefield.\n• Retains all equipment, upgrades, and weapon selections assigned during Army Building.\nA Unit leaves Reserves when it is deployed to the battlefield via a Deploy action (Part 8.5.5). Some rules may return a Unit to Reserves during play- see Part 8.5.5 for how Damage, effects, and Supply are handled. In the final Round of the game, all Units still in Reserves that are not deployed are treated as Destroyed for scoring purposes (Part 8.10).',
      ko: '유닛이 전개되기 전까지 머무는, 전장 밖의 대기 구역입니다. 모든 유닛은 예비 병력에서 게임을 시작합니다. 예비 병력에 있는 동안 유닛은 다음 규칙을 따릅니다.\n• 능력에 예비 병력의 유닛에게 영향을 준다고 달리 명시되지 않는 한, 공격이나 능력의 대상이 될 수 없습니다.\n• 능력에 달리 명시되지 않는 한, 발동형 능력, 지속형 능력, 반응형 능력을 사용할 수 없습니다.\n• 임무 마커를 점령하거나 경합할 수 없습니다.\n• 해당 유닛의 현재 인구수는 전장에 있는 아군 유닛들의 현재 최종 인구수에 포함되지 않습니다.\n• 병력 편성 중 적용된 모든 장비, 업그레이드, 무기 선택을 그대로 유지합니다.\n유닛이 전개 행동(8.5.5 항목)을 통해 전장에 전개되면 예비 병력을 떠납니다. 일부 규칙은 게임 중 유닛을 예비 병력으로 복귀시킬 수 있습니다. 이 경우 피해, 효과 및 인구수의 처리 방법은 8.5.5 항목을 참조합니다. 게임의 마지막 라운드에 예비 병력에 남아 전개되지 않은 모든 유닛은 득점을 계산할 때 파괴된 것으로 간주합니다(8.10 항목).',
    },
  },
  {
    id: 'RESPAWN (X)',
    name: { en: 'RESPAWN (X)', ko: '재생성(X)' },
    definition: {
      en: "Return up to X Destroyed models to this Unit.\n• The return cannot increase the Unit's Current Supply Value. Do not return a model if doing so would push the Unit into a higher Supply bracket.\n• Set each returned model in Base-to-Base contact with an existing model in the Unit. Returned models cannot be set Within the Engagement Range of any Enemy Unit.\n• If a model cannot be set legally, it cannot be returned.",
      ko: '파괴된 모형을 최대 X기까지 이 유닛으로 복귀시킵니다.\n• 모형의 복귀로 인해 해당 유닛의 현재 인구수가 증가해서는 안 됩니다. 모형을 복귀시키면 더 높은 인구수 구간으로 이동하게 되는 경우 해당 모형을 복귀시킬 수 없습니다.\n• 복귀하는 각 모형은 유닛에 남아 있는 기존 모형과 베이스 접촉 상태가 되도록 놓습니다. 복귀한 모형은 적 유닛의 교전 범위 이내에 들어온 상태로 놓을 수 없습니다.\n• 모형을 적법하게 놓을 수 없다면 해당 모형은 복귀시킬 수 없습니다.',
    },
  },
  {
    id: 'SHIELDED',
    name: { en: 'SHIELDED', ko: '보호막 가동' },
    definition: {
      en: 'If a Shield value is present on a Unit Card, add it to the Hit Points (HP) of the first model. The Unit is Shielded. The Unit loses its Shielded Status when the Total Damage assigned to it exceeds its Shield value or when the first model in the Unit is removed.\nThe Shielded Status is referenced by other abilities. Losing Shielded Status does not remove any remaining Hit Points, it only ends effects that require the Unit to be Shielded. Shielded Status cannot be restored by HEAL.',
      ko: '유닛 카드에 보호막 수치가 있다면 첫 번째 모형의 체력(HP)에 해당 수치를 더합니다. 이 유닛은 보호막 가동 상태입니다. 유닛에 배분된 최종 피해가 보호막 수치를 초과하거나 첫 번째 모형이 제거되면 보호막 가동 상태를 잃습니다.\n보호막 가동 상태는 다른 능력에서 참조할 수 있습니다. 보호막 가동 상태를 잃어도 남아 있는 체력이 제거되는 것은 아닙니다. 보호막 가동을 요구하는 효과만 종료됩니다. 보호막 가동 상태는 치유로 회복할 수 없습니다.',
    },
  },
  {
    id: 'SIDEARM',
    name: { en: 'SIDEARM', ko: '보조 무기' },
    definition: {
      en: 'When this Unit performs a Ranged Attack or Close Combat Attack, models equipped with this weapon may use it, ignoring the normal restriction of one weapon per model (Part 8.7.3). If a model is equipped with multiple SIDEARM weapons, it may use all of them in the same activation.\nAttacks made with each SIDEARM must be resolved in separate Batches. Because they are separate Batches, SIDEARM attacks may target a different Enemy Unit than the Unit\'s other weapons, subject to all standard target eligibility requirements.',
      ko: '이 유닛이 원거리 공격 또는 근접전 공격을 수행할 때, 이 무기를 장착한 모형은 모형당 무기 하나만 사용할 수 있다는 일반 제한을 무시하고 이 무기를 사용할 수 있습니다(8.7.3 항목). 한 모형이 보조 무기를 여러 개 장착했다면 동일한 활성화 동안 그 무기를 모두 사용할 수 있습니다.\n각 보조 무기의 공격은 서로 별도의 묶음으로 처리해야 합니다. 별도의 묶음이므로 보조 무기 공격은 유닛의 다른 무기가 공격하는 대상과 다른 적 유닛을 대상으로 지정할 수 있습니다. 단, 모든 일반적인 공격 대상 적합성 조건은 충족해야 합니다.',
    },
  },
  {
    id: 'SIEGE MODE',
    name: { en: 'SIEGE MODE', ko: '공성 모드' },
    definition: {
      en: 'While a Unit has the SIEGE MODE Status, apply the following rules:\n• This Unit cannot perform the Move, Disengage, Run, Charge or Close Ranks actions.\n• Weapons profile with Siege Mode Status can only be used while this unit has SIEGE MODE Status.\n• While this unit has Siege Mode Status any other weapons can\'t be used.\n• When this Unit is returned to Reserves, it loses the SIEGE MODE Status.',
      ko: '유닛이 공성 모드 상태인 동안 다음 규칙을 적용합니다.\n• 이 유닛은 이동, 이탈, 질주, 돌격, 대열 정비 행동을 수행할 수 없습니다.\n• 공성 모드 상태가 표시된 무기 프로필은 이 유닛이 공성 모드 상태일 때만 사용할 수 있습니다.\n• 이 유닛이 공성 모드 상태인 동안 다른 무기는 사용할 수 없습니다.\n• 이 유닛이 예비 병력으로 복귀하면 공성 모드 상태를 잃습니다.',
    },
  },
  {
    id: 'SPECIAL ABILITY',
    name: { en: 'SPECIAL ABILITY', ko: '특수 능력' },
    definition: {
      en: 'A Special Ability is any named ability printed on a Unit Card, Tactical Card, or Faction Card. Every Special Ability falls into one of three categories: Active Ability, Passive Ability, or Reaction Ability (Part 2.7).\n• Active Abilities require the Unit to be Activated and are triggered immediately before or after an action. Each named Active Ability may be used once per Round per Unit unless it has the REPEATABLE keyword.\n• Passive Abilities are always in effect as long as the Unit is on the battlefield.\n• Reaction Abilities fire in response to a specific trigger. Each player may resolve only one Reaction per Activation, and each named Reaction Ability may be used only once per Round per Unit.\nAll three types are inactive while the Unit is in Reserves unless the ability explicitly states otherwise. A Unit cannot be affected by multiple instances of the same-named Special Ability simultaneously.',
      ko: '유닛 카드, 전술 카드 또는 진영 카드에 이름이 붙어 표시된 모든 능력은 특수 능력입니다. 모든 특수 능력은 발동형 능력, 지속형 능력, 반응형 능력 중 하나입니다(2.7 항목).\n발동형 능력: 유닛이 활성화된 상태여야 하며, 어떤 행동을 선언하기 직전 또는 행동이 완전히 처리된 직후 발동됩니다. 반복 가능 키워드가 없다면 같은 명칭의 발동형 능력은 유닛이 라운드당 한 번만 사용할 수 있습니다.\n지속형 능력: 유닛이 전장에 있는 동안 항상 적용됩니다.\n반응형 능력: 각 플레이어는 한 번의 활성화 동안 반응형 능력 하나만 처리할 수 있으며, 같은 명칭의 반응형 능력은 유닛이 라운드당 한 번만 사용할 수 있습니다.\n능력에 달리 명시되어 있지 않은 한 세 유형 모두 유닛이 예비 병력에 있는 동안에는 기능하지 않습니다. 하나의 유닛이 같은 명칭의 특수 능력 여러 개의 효과를 동시에 받을 수 없습니다.',
    },
  },
  {
    id: 'SPECIALIST',
    name: { en: 'SPECIALIST', ko: '전문가' },
    definition: {
      en: 'A Unit may include only one model equipped with this weapon. Multiple upgrades configuring more than one instance of this weapon are not permitted (Part 9.1.7).',
      ko: '유닛에는 이 무기를 장착한 모형을 최대 1기만 포함할 수 있습니다. 이 무기를 둘 이상 장착하도록 업그레이드할 수 없습니다(9.1.7 항목).',
    },
  },
  {
    id: 'SPILLOVER',
    name: { en: 'SPILLOVER', ko: '전이' },
    definition: {
      en: 'Additional hits generated by a Template Weapon that strike models outside the Primary target Unit. When a Blast Template (BT) or Flamer Template (FT) covers models belonging to Units other than the Primary target, those models are resolved as Spillover. Each affected Unit is resolved as a separate Batch. Spillover Batches do not apply Rate of Attack modifiers and do not generate Surge. Spillover may affect both Friendly and Enemy Units. See Part 8.7.6 for the full Template Weapon procedure.',
      ko: '템플릿 무기로 인해 주 공격 대상 유닛 밖의 모형에 발생하는 추가 명중입니다. 폭발 템플릿(BT) 또는 화염 템플릿(FT)이 주 공격 대상이 아닌 다른 유닛의 모형을 덮는다면 해당 모형에 대한 공격을 전이로 처리합니다. 영향을 받은 각 유닛은 별도의 묶음으로 처리합니다. 전이 묶음에는 타격 횟수 수정치를 적용하지 않으며 상성을 발생시키지 않습니다. 전이는 아군과 적 유닛 모두에게 영향을 줄 수 있습니다. 전체 템플릿 무기 처리 절차는 8.7.6 항목을 참조하십시오.',
    },
  },
  {
    id: 'STATIONARY',
    name: { en: 'STATIONARY', ko: '정지한' },
    definition: {
      en: 'At the Start of the Round, all Units gain this Status. A Unit immediately loses this Status if any model in this Unit moves, is moved, or is PLACED for any reason.',
      ko: '라운드 시작 시 모든 유닛은 이 상태를 얻습니다. 유닛의 모형 하나라도 어떤 이유로 이동하거나, 이동당하거나, 배치되면 해당 유닛은 즉시 이 상태를 잃습니다.',
    },
  },
  {
    id: 'STATUS',
    name: { en: 'STATUS', ko: '상태' },
    definition: {
      en: 'A category of keyword representing a temporary or persistent operational mode, condition, or statistic modifier affecting a Unit (e.g. BURROWED, SIEGE MODE). Unless stated otherwise, Statuses aren\'t removed during the Scoring and Cleanup Phase. They stay on the Unit until they are removed by other means.\nA Unit\'s active Status is visually tracked using Status Markers set next to the Unit:\n• Modes: Use Plastic Markers to track operational shifts (e.g. SIEGE MODE, BURROWED). Those Status Markers have STAY IN PLAY.\n• Other Statuses: Use Markers to track other effects affecting the Unit. Positive effects are tracked with Buff Markers (Blue), and negative effects are tracked with Debuff Markers (Red). Those Status Markers have STAY IN PLAY.',
      ko: '유닛에 영향을 주는 일시적 또는 지속적인 작전 모드, 상태 또는 특성치 수정치를 나타내는 키워드 범주입니다(예: 잠복, 공성 모드). 달리 명시되지 않는 한, 상태는 득점 및 정리 단계에서 제거되지 않으며 다른 방법으로 제거될 때까지 유닛에 남습니다. 유닛이 현재 가진 상태는 유닛 옆에 상태 마커를 놓아 표시합니다.\n모드: 공성 모드나 잠복과 같은 작전 상태 변화를 플라스틱 마커로 표시합니다. 이러한 상태 마커는 잔류 키워드를 가집니다.\n기타 상태: 유닛에 영향을 주는 다른 효과는 마커로 표시합니다. 긍정적인 효과는 강화 마커(파란색), 부정적인 효과는 약화 마커(빨간색)로 표시합니다. 이러한 상태 마커도 잔류 키워드를 가집니다.',
    },
  },
  {
    id: 'STAY IN PLAY',
    name: { en: 'STAY IN PLAY', ko: '잔류' },
    definition: {
      en: 'This Token, Marker or Ability Effect persists through Cleanup & Refresh (overrides Part 8.9.5). It remains until a specific condition removes it (e.g. destroyed or duration expires).',
      ko: '이 토큰, 마커 또는 능력 효과는 정리 및 갱신을 거쳐도 유지됩니다(8.9.5 항목보다 우선). 파괴되거나 지속 시간이 끝나는 등 특정 조건으로 제거될 때까지 남아 있습니다.',
    },
  },
  {
    id: 'SUMMON (Unit Name)',
    name: { en: 'SUMMON (Unit Name)', ko: '소환(유닛 이름)' },
    definition: {
      en: "Set the Leading Model of the named Unit in Base-to-Base contact with the Parent Unit. Set remaining models In Coherency. Models cannot be set Within the Engagement Range of any Enemy Unit.\nSet an Activation Marker next to the summoned Unit - it cannot be Activated during the Phase in which it was summoned. In subsequent Phases, this Unit must be Activated immediately after its Parent Unit's activation ends, before the opponent's next activation.\nThe Summoned Unit cannot be set Within the opponent's Zone of Influence. The player must have sufficient Available Supply. If the Unit's Current Supply Value would cause Total Current Supply to exceed the Supply Pool, it cannot be Summoned.\nIf the Parent is not present on the battlefield, this Unit can be Activated normally.",
      ko: '지정된 유닛의 대표 모형을 본체 유닛과 베이스 접촉 상태가 되도록 놓습니다. 나머지 모형은 대형 유지 상태가 되도록 놓습니다. 모형은 적 유닛의 교전 범위 이내에 들어온 상태로 놓을 수 없습니다.\n소환된 유닛 옆에 활성화 마커를 놓습니다. 이 유닛은 소환된 단계 동안 활성화할 수 없습니다. 이후 단계에서는 본체 유닛의 활성화가 끝난 직후, 상대의 다음 활성화보다 먼저 이 유닛을 활성화해야 합니다.\n소환된 유닛은 상대의 영향권 이내에 들어온 상태로 놓을 수 없습니다.\n플레이어에게 반드시 충분한 잔여 보급품이 있어야 합니다. 소환할 유닛의 현재 인구수 수치를 더했을 때 전장에 있는 플레이어 유닛들의 현재 최종 인구수가 보급품 한도를 초과한다면 소환할 수 없습니다.\n본체 유닛이 전장에 없다면, 이 유닛은 일반적인 방법으로 활성화할 수 있습니다.',
    },
  },
  {
    id: 'SUPPLY VALUE',
    name: { en: 'SUPPLY VALUE', ko: '인구수' },
    definition: {
      en: "The Supply Value of a Unit is the value shown on the Unit Card's Supply Profile corresponding to the Unit's current model count. A Unit's starting Supply Value is determined during Army Building by the Composition Option selected (Part 9.1.6) and defines how many Army Slots the Unit occupies.\nSupply Value is a dynamic characteristic- as casualties reduce the model count into a lower bracket on the Supply Profile, the Supply Value decreases. Update immediately when a casualty moves the Unit into a lower bracket. Supply is used for Deployment, Mission Marker Control, Tactical Mass, and scoring.",
      ko: '유닛의 인구수는 현재 유닛에 남아 있는 모형 수에 대응하여 유닛 카드의 인구수 프로필에 표시된 값입니다. 유닛의 시작 인구수는 병력 편성 중 선택한 구성 선택지에 의해 결정되며(9.1.6 항목), 해당 유닛이 차지하는 편성 슬롯의 수를 결정합니다.\n인구수는 유동적인 특성입니다. 사상자가 발생하여 모형 수가 인구수 프로필의 더 낮은 구간으로 내려가면 인구수도 감소합니다. 사상자로 인해 유닛이 더 낮은 인구수 구간으로 이동하는 즉시 인구수를 갱신합니다. 인구수는 전개, 임무 마커 점령, 전술적 규모 및 득점에 사용합니다.',
    },
  },
  {
    id: 'SUPPORTING RANK',
    name: { en: 'SUPPORTING RANK', ko: '지원열' },
    definition: {
      en: 'A model is in the Supporting Rank if it is in Base-to-Base contact with a Friendly model from the same Unit that is in the Fighting Rank, but is not itself Within the Engagement Range of an Enemy model. Models in the Supporting Rank may strike with their Combat Phase weapons as though they were in the fight. See Part 8.8.1, Step 2.',
      ko: '전투열에 있는 같은 유닛의 아군 모형과 베이스 접촉 상태이지만, 자신은 적 모형의 교전 범위 이내에 들어온 상태가 아닌 모형은 지원열에 있습니다. 지원열에 있는 모형은 전투에 참여하고 있는 것처럼 전투 단계 무기로 공격할 수 있습니다. 8.8.1 항목 2단계를 참조하십시오.',
    },
  },
  {
    id: 'SURGE',
    name: { en: 'SURGE', ko: '상성' },
    definition: {
      en: "A weapon's Surge Die (rolled alongside the Attack Roll if the weapon has an S Dice characteristic) is resolved after the Roll to Hit. Check if the target Unit's Combat Tag matches the weapon's Surge Type: if not, the Surge Die result is discarded and no dice move. If it matches, move a number of dice equal to the Surge Die result from the Armour Pool directly to the Damage Pool, bypassing Armour entirely - Surge can never move more dice than are currently in the Armour Pool (Part 8.7.4).",
      ko: '무기에 S 주사위 특성치가 있다면 명중 굴림 때 다른 색상의 상성 주사위 하나를 함께 굴리며, 명중 굴림 다음 단계에서 상성을 처리합니다.\n대상 유닛의 전투 분류가 무기의 상성 유형과 일치하는지 확인합니다. 일치하지 않는다면 상성 주사위의 결과를 완전히 무시하고 해당 주사위를 버립니다. 이 단계에서는 어떤 방어 주사위도 피해 주사위로 바뀌지 않습니다.\n일치한다면 상성 주사위의 결과만큼 방어 주사위를 즉시 피해 주사위로 바꿉니다. 이 주사위들은 방어 굴림을 완전히 건너뜁니다. 상성으로 피해 주사위로 바꿀 수 있는 방어 주사위의 수는 현재 남아 있는 주사위 수를 초과할 수 없습니다(8.7.4 항목).',
    },
  },
  {
    id: 'TACTICAL MASS',
    name: { en: 'TACTICAL MASS', ko: '전술적 규모' },
    definition: {
      en: 'A Unit has Tactical Mass when its Current Supply Value exceeds the Combined Current Supply Value of all Enemy Units it is Engaged with. A Unit with Tactical Mass ignores the Disengage penalty (Part 8.5.4): it may Ranged Attack and Charge normally in the following Assault Phase after Disengaging.',
      ko: '유닛의 현재 인구수 수치가 자신과 교전 중인 모든 적 유닛의 현재 인구수 수치보다 크다면 해당 유닛은 전술적 규모를 가집니다. 전술적 규모를 가진 유닛은 이탈 페널티를 무시합니다(8.5.4 항목). 따라서 이탈한 뒤 이어지는 공세 단계에서 원거리 공격 또는 돌격을 정상적으로 수행할 수 있습니다.',
    },
  },
  {
    id: 'TARGET POINT',
    name: { en: 'TARGET POINT', ko: '목표점' },
    definition: {
      en: 'The reference point used to align a Template Weapon: the centre of the target model\'s base. For a Blast Template (BT), the template must cover as much of the target model\'s base as possible; for a Flamer Template (FT), the narrow end must be flush with the attacking model\'s base edge and aimed at the target. Templates affect only models on the same elevation level as the Target Point (Part 8.7.6).',
      ko: '템플릿 무기를 놓을 때 기준으로 삼는, 대상 모형 베이스의 중심입니다. 폭발 템플릿(BT)은 대상 모형의 베이스를 가능한 한 많이 덮도록 놓아야 하며, 화염 템플릿(FT)은 좁은 끝이 공격 모형의 베이스 가장자리에 맞닿은 채 대상을 향하도록 놓아야 합니다. 템플릿은 목표점과 같은 고도에 있는 모형에게만 영향을 줍니다(8.7.6 항목).',
    },
  },
  {
    id: 'TOUGH (X)',
    name: { en: 'TOUGH (X)', ko: '강인함(X)' },
    definition: {
      en: 'When this Unit resolves an Armour Roll, change up to X failed results into successes. Treat them as meeting or exceeding the Armour characteristic - discard them without moving to the Damage Pool.',
      ko: '이 유닛이 방어 굴림을 처리할 때, 실패한 결과 중 최대 X개를 성공으로 변경합니다. 해당 결과는 방어 특성 이상이 나온 것으로 취급하여 피해 주사위로 옮기지 않고 버립니다.',
    },
  },
  {
    id: 'UNENGAGED',
    name: { en: 'UNENGAGED', ko: '교전 중이 아닌' },
    definition: {
      en: 'A Ground Unit is Unengaged when none of its models is Within 1" of any Enemy Ground model, or when terrain restrictions (Part 7.2.1) prevent valid Engagement despite proximity. Flying Units are always Unengaged.\nAn Unengaged Unit may perform a standard Move, Run, Ranged Attack, or Charge without restriction. Only Unengaged Units may be selected to perform a Move action (Part 8.5.2).',
      ko: '지상 유닛의 어느 모형도 적 지상 모형의 1인치 이내에 있지 않거나, 서로 가까이 있더라도 지형 제한(7.2.1 항목) 때문에 적법한 교전이 성립하지 않는다면 해당 유닛은 교전 중이 아닌 상태입니다. 공중 유닛은 항상 교전 중이 아닌 상태입니다.\n교전 중이 아닌 유닛은 제한 없이 일반 이동, 질주, 원거리 공격 또는 돌격을 수행할 수 있습니다. 이동 행동은 교전 중이 아닌 유닛만 선택하여 수행할 수 있습니다(8.5.2 항목).',
    },
  },
  {
    id: 'VISIBLE',
    name: { en: 'VISIBLE', ko: '보이는' },
    definition: {
      en: 'A model is Visible to another model if a valid Line of Sight trace can be drawn between them (Part 7.1). If the trace does not pass through any Blocking Terrain, the target is Visible without further checks. If the trace passes through Blocking Terrain, apply the Cover rules (Part 7.1.1) - the target remains Visible unless Full Cover or Direct Cover blocks the Line of Sight.',
      ko: '한 모형에서 다른 모형까지 적법한 시야선을 그을 수 있다면 해당 모형은 보이는 상태입니다(7.1 항목). 시야선이 어떠한 엄폐물도 통과하지 않는다면 추가 판정 없이 대상이 보입니다. 시야선이 엄폐물을 통과한다면 엄폐 규칙(7.1.1 항목)을 적용합니다. 완전 엄폐 또는 직접 엄폐가 시야를 차단하지 않는 한 대상은 계속 보입니다.\n은신 키워드를 가진 모형은 시야 여부와 관계없이 4인치보다 멀리 떨어진 모형에게는 보이지 않습니다.',
    },
  },
  {
    id: 'WHOLLY WITHIN',
    name: { en: 'WHOLLY WITHIN', ko: '완전히 들어온' },
    definition: {
      en: 'A model is Wholly Within a distance only if its entire base sits inside that range - no part of the base may extend beyond the edge. A Unit is Wholly Within a distance only if every model in the Unit satisfies this condition.\nWholly Within is a stricter requirement than Within and is used for Coherency checks (Part 4.4), certain ability areas of effect, and Mission Marker eligibility. When a rule specifies Wholly Within, partial overlap is not sufficient.',
      ko: '모형의 베이스 전체가 지정된 범위 이내에 있어야 해당 모형은 그 범위 이내에 완전히 들어온 상태입니다. 베이스의 어느 부분도 해당 범위의 경계 밖으로 벗어나서는 안 됩니다. 유닛의 모든 모형이 이 조건을 충족해야 해당 유닛은 그 거리 이내에 완전히 들어온 상태입니다.\n완전히 들어온은 들어온보다 엄격한 조건이며 대형 확인(4.4 항목), 일부 능력의 효과 범위, 임무 마커 경합 자격 등에 사용합니다. 규칙에서 완전히 들어온을 요구한다면 일부만 범위 안에 들어와 있는 것으로는 조건을 충족하지 않습니다.',
    },
  },
  {
    id: 'WITHIN',
    name: { en: 'WITHIN', ko: '들어온' },
    definition: {
      en: 'A model is Within a distance if any part of its base touches or crosses into that range. A Unit is Within a distance if at least one model in the Unit meets this condition.\nWithin is a less restrictive requirement than Wholly Within. When a rule specifies Within without the word "Wholly," partial overlap is sufficient.',
      ko: '모형의 베이스 일부라도 지정된 거리의 경계에 닿거나 그 안으로 들어오면 해당 모형은 그 거리 이내에 들어온 상태입니다. 유닛은 유닛의 모형 중 하나 이상이 이 조건을 충족하면 해당 거리 이내에 들어온 상태로 간주합니다.\n들어온은 완전히 들어온보다 덜 엄격한 조건입니다. 규칙에서 "완전히"라는 표현 없이 "들어온"이라고만 명시한다면 일부만 범위 이내에 들어와 있어도 충분합니다.',
    },
  },
  {
    id: 'ZONE OF INFLUENCE',
    name: { en: 'ZONE OF INFLUENCE', ko: '영향권' },
    definition: {
      en: "A restricted area of the battlefield extending 6\" inward from a player's Entry Edge, as defined by the Deployment Card. Where the Entry Edge does not run the full length of a table edge, the Zone of Influence is marked using Zone of Influence Markers set at the corners of the Entry Edge.\nUnits arriving from Reserves cannot end their deployment Within the opponent's Zone of Influence. This restriction applies to all forms of arrival - whether by standard deployment, transport, or SUMMON (Part 8.3.3).\nThe Zone of Influence does not affect Units already on the battlefield. It does not restrict movement, block Line of Sight, or interact with any other rule once a Unit has completed its arrival.",
      ko: '전장 카드에 표시된, 플레이어의 진입 경계로부터 안쪽으로 6인치까지 뻗은 제한 구역입니다. 진입 경계가 테이블 가장자리 전체를 따라 이어지지 않을 때는 진입 경계의 모서리에 영향권 마커를 놓아 영향권을 표시합니다.\n예비 병력에서 도착하는 유닛은 상대의 영향권 이내에 들어온 상태로 전개를 끝낼 수 없습니다. 이 제한은 일반적인 전개, 수송 또는 소환을 포함한 모든 진입 방식에 적용됩니다(8.3.3 항목).\n영향권은 이미 전장에 있는 유닛에는 적용되지 않습니다. 유닛이 전장에 진입한 뒤에는 이동을 제한하거나 시야를 차단하지 않으며 다른 규칙에도 영향을 주지 않습니다.',
    },
  },
]
