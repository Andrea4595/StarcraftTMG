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
    name: { en: 'ACCESS POINT', ko: 'ACCESS POINT' },
    definition: {
      en: 'Part of a Terrain that connects different elevation levels. Models moving through an ACCESS POINT can change their elevation.',
      ko: '지형에서 서로 다른 고도를 연결하는 지형의 일부. 액세스 포인트를 통과해서 이동하는 모델은 자신의 고도를 바꿀 수 있다.',
    },
  },
  {
    id: 'ACTIVATION MARKER',
    name: { en: 'ACTIVATION MARKER', ko: 'ACTIVATION MARKER' },
    definition: {
      en: 'A physical marker set beside a Unit that has completed its turn in the current Phase. Activation Markers are double-sided: the arrow-up side shows the Unit has finished its turn in the Movement Phase (Phase 1), and the reverse side shows it has finished its turn in the Assault Phase (Phase 2) (Part 7.3.2).',
      ko: '현재 Phase에서 차례를 마친 유닛 옆에 놓는 실물 마커. Activation Marker는 양면으로 되어 있으며, 화살표가 위를 향한 면은 그 유닛이 Movement Phase(Phase 1)에서 차례를 마쳤음을, 뒷면은 Assault Phase(Phase 2)에서 차례를 마쳤음을 나타낸다 (Part 7.3.2).',
    },
  },
  {
    id: 'ACTIVE PLAYER',
    name: { en: 'ACTIVE PLAYER', ko: 'ACTIVE PLAYER' },
    definition: {
      en: 'The player whose turn it is to act.',
      ko: '현재 액션할 차례인 플레이어를 뜻한다.',
    },
  },
  {
    id: 'ANTI-EVADE (X)',
    name: { en: 'ANTI-EVADE (X)', ko: 'ANTI-EVADE (X)' },
    definition: {
      en: 'When resolving an attack with this weapon against Enemy Units, the target Unit suffers a -X Modifier to its Evade Roll for this attack (Part 8.7.4, Step 4).',
      ko: '이 능력을 지닌 무기로 상대를 공격할 때, 회피 롤에서 -X의 수정치를 지닌다.',
    },
  },
  {
    id: 'ARMOUR POOL',
    name: { en: 'ARMOUR POOL', ko: 'ARMOUR POOL' },
    definition: {
      en: "The second of the three dice pools used to resolve an attack. The defender rolls all dice in the Armour Pool against the target Unit's Armour characteristic: each die that meets or exceeds the Armour value is a success and is discarded, while each failure moves to the Damage Pool. Dice moved out of the Armour Pool by Surge or CRITICAL HIT are set directly into the Damage Pool without an Armour Roll (Part 8.7.4).",
      ko: '공격을 처리할 때 사용하는 세 개의 주사위 풀 중 두 번째 풀. 방어자는 Armour Pool에 있는 모든 주사위를 대상 유닛의 Armour 특성치에 대해 굴린다: Armour 수치 이상이 나온 주사위는 성공으로 버려지고, 실패한 주사위는 Damage Pool로 옮겨진다. Surge나 CRITICAL HIT으로 Armour Pool에서 빠져나온 주사위는 Armour Roll 없이 곧바로 Damage Pool로 들어간다 (Part 8.7.4).',
    },
  },
  {
    id: 'ARMY SLOT',
    name: { en: 'ARMY SLOT', ko: 'ARMY SLOT' },
    definition: {
      en: 'Army Slots determine how many and what types of Units may be included in an army. Each Army Slot has a specific type: Core, Elite, Support, Air, or Hero. Every Unit occupies a number of Army Slots of its designated type equal to its starting Supply Value.\nThe Faction Card provides the initial pool of Army Slots. Additional Army Slots are unlocked by purchasing Tactical Cards with Vespene Gas during Army Building (Part 9.1.5). Unused Army Slots are lost - they cannot be converted, exchanged, or carried forward.',
      ko: '아미에 포함될 수 있는 유닛의 종류와 수를 정한다. 슬롯에는 서포트, 엘리트, 에어, 히어로, 코어 등이 있으며 각 유닛은 이 슬롯에 맞는 특정 타입을 갖는다. 팩션 카드와 택티컬 카드로 이 슬롯의 종류와 개수를 해금할 수 있고, 해금한 만큼을 아미에 넣을 수 있다. 사용하지 않은 여분의 슬롯은 소모된다.',
    },
  },
  {
    id: 'ATTACK POOL',
    name: { en: 'ATTACK POOL', ko: 'ATTACK POOL' },
    definition: {
      en: "The first of the three dice pools used to resolve an attack. Generate a number of dice equal to each attacking model's Rate of Attack (RoA), plus a Surge Die if the weapon has an S Dice characteristic. Roll all dice against the weapon's Hit characteristic: each die that meets or exceeds the Hit value is a success and moves to the Armour Pool, while failures are discarded (Part 8.7.4).",
      ko: '공격을 처리할 때 사용하는 세 개의 주사위 풀 중 첫 번째 풀. 공격하는 각 모델의 Rate of Attack(RoA)만큼 주사위를 생성하고, 무기에 S Dice 특성치가 있다면 Surge Die를 하나 추가한다. 모든 주사위를 무기의 Hit 특성치에 대해 굴린다: Hit 수치 이상이 나온 주사위는 성공으로 Armour Pool로 옮기고, 실패한 주사위는 버린다 (Part 8.7.4).',
    },
  },
  {
    id: 'AVAILABLE SUPPLY',
    name: { en: 'AVAILABLE SUPPLY', ko: 'AVAILABLE SUPPLY' },
    definition: {
      en: 'Available Supply is the remaining Supply capacity available for new deployments. It equals the current Supply Pool minus the Total Current Supply Value of all Friendly Units on the battlefield (Part 8.3.2).\nA Unit may only be deployed from Reserves if its Current Supply Value is less than or equal to the Available Supply. At no point may the Total Current Supply of a player\'s on-table Units exceed the Supply Pool. Units Destroyed or reduced by casualties free up Available Supply for new arrivals. In the final Round of the game, the Supply Pool becomes unlimited, and the Available Supply restrictions are lifted.',
      ko: '새로 배치에 사용할 수 있는 남은 서플라이의 양으로, 서플라이 풀 전체에서 전장에 있는 모든 아군 유닛의 서플라이값 총합을 뺀 값이다. 새로 배치를 할 때는 이 가용 서플라이값 이하의 서플라이를 지닌 유닛만 리저브에서 배치할 수 있다. 유닛이 파괴되거나 모델이 줄어들면 가용 서플라이가 늘어난다. 마지막 라운드에는 가용 서플라이의 제한이 사라진다.',
    },
  },
  {
    id: 'BASE-TO-BASE CONTACT',
    name: { en: 'BASE-TO-BASE CONTACT', ko: 'BASE-TO-BASE CONTACT' },
    definition: {
      en: 'Two models are in Base-to-Base Contact when their bases are physically touching. The distance between models in Base-to-Base Contact is 0" (Part 4.1).',
      ko: '두 모델의 베이스가 물리적으로 맞닿아 있으면 Base-to-Base Contact 상태다. Base-to-Base Contact 상태인 모델 사이의 거리는 0"이다 (Part 4.1).',
    },
  },
  {
    id: 'BATCH',
    name: { en: 'BATCH', ko: 'BATCH' },
    definition: {
      en: "A Batch consists of all models firing the same weapon at the same target. All models using the same Weapon Profile must fire at the same target - a single profile's fire cannot be split. When a Unit has multiple Weapon Profiles or fires at different targets, each is resolved as a separate Batch: declare the target of one Batch, resolve it fully, then declare the next (Part 8.7.3).",
      ko: 'Batch는 같은 무기로 같은 대상을 쏘는 모든 모델로 구성된다. 같은 Weapon Profile을 사용하는 모든 모델은 같은 대상을 쏴야 한다 - 하나의 프로필의 사격을 나눠서 쏠 수 없다. 유닛이 여러 Weapon Profile을 가지고 있거나 서로 다른 대상을 쏠 때는 각각을 별도의 Batch로 처리한다: 한 Batch의 대상을 선언하고 완전히 처리한 다음, 다음 Batch의 대상을 선언한다 (Part 8.7.3).',
    },
  },
  {
    id: 'BLOCKING TERRAIN',
    name: { en: 'BLOCKING TERRAIN', ko: 'BLOCKING TERRAIN' },
    definition: {
      en: 'Any terrain piece with an Effective Size of 1 or greater. Blocking Terrain obstructs Line of Sight according to the Cover rules (Part 7.1.1). Whether a model may move through that terrain is determined separately by the movement rules, terrain Size, ACCESS POINTS, Gap Clearance, and any relevant terrain keywords.',
      ko: '유효 사이즈가 1 이상인 모든 지형. 시야 차단 지형은 커버 규칙에 의해 시야를 가린다. 지형을 통과할 수 있는지는 이동 규칙 등으로 정해진다.',
    },
  },
  {
    id: 'BUFF [Characteristic] (X)',
    name: { en: 'BUFF [Characteristic] (X)', ko: 'BUFF [Characteristic] (X)' },
    definition: {
      en: 'The Unit gains a bonus of X to the specified characteristic until the End of the Round.\n• Target Number characteristic (e.g. Armour, Hit): reduce the value by X (easier to roll).\n• Value characteristic (e.g. Speed, RoA): increase the value by X.',
      ko: '라운드 종료까지 [명시된 능력치]를 X만큼 강화시킨다. 아머나 힛 같은 목표 수치형 능력치는 감소로 작용하고, 스피드 등의 수치형 능력치는 증가로 작용한다.',
    },
  },
  {
    id: 'BULKY',
    name: { en: 'BULKY', ko: 'BULKY' },
    definition: {
      en: 'This weapon cannot be used to make a Ranged Attack while the Unit is currently Engaged (Part 8.7.3).',
      ko: '이 키워드를 지닌 무기는 인게이지 상태일 때의 사격으로는 사용할 수 없다.',
    },
  },
  {
    id: 'BURROWED',
    name: { en: 'BURROWED', ko: 'BURROWED' },
    definition: {
      en: '• BURROWED is classified as a Status.\n• A BURROWED Unit has the HIDDEN Status.\n• Its Size is treated as 0 for all purposes\n• Its Current Supply Value is treated as 0 for Disengage checks.\n• A BURROWED Unit cannot Control or Contest Mission Markers (overrides Parts 6.2 and 8.9.1).\n• While BURROWED, the Unit may only perform Deploy, Move, Disengage, Run, Hold and Close Ranks actions. Performing any of these (except Hold) immediately removes the BURROWED status.\n• BURROWED Units may use Special Abilities unless stated otherwise.\n• BURROWED Units may make an Evade Roll against every attack targeting them.\n• Other models may move through a BURROWED Unit\'s models, provided they do not end Within the Engagement Range of the BURROWED Unit (overrides Part 8.5.3).\n• If a BURROWED Unit is Engaged at the start of the Combat Phase, it must be Activated but cannot perform a Close Combat Attack in its BURROWED state. The Unit may perform Close Ranks as its first step, which immediately removes the BURROWED status. Once the status is removed, the Unit completes the remaining steps of the Close Combat Attack normally. If the Unit does not or cannot perform Close Ranks, it does not attack. Enemy Units Engaged with a BURROWED Unit may attack it as normal regardless of its status.',
      ko: '• 잠복은 Status로 분류된다.\n• 히든 상태를 지니며 사이즈는 0으로 취급되고 이탈 판정 시 서플라이값을 0으로 친다.\n• 미션 마커를 점령하거나 경쟁할 수 없다.\n• 배치, 이동, 이탈, 질주, 대기, 진형유지 액션만 가능하며, 대기를 제외한 액션 시 즉시 잠복을 해제시킨다.\n• 자신에게 가해지는 모든 공격에 회피 롤이 가능하게 된다.\n• 다른 모델은 잠복 상태인 모델을 통과해서 이동할 수 있다. 하지만 잠복 상태인 모델의 인게이지 거리 안에서 이동을 마칠 순 없다.\n• 컴뱃 페이즈 시작 시 인게이지 상태라면, 공격은 불가능하지만 진형유지는 가능하다. 그럴 경우 잠복은 해제된다.\n• 상태가 제거되면, 이 유닛은 정상적으로 근접 공격의 남은 단계들을 수행한다. 이 유닛이 진형유지를 수행하지 않거나 할 수 없다면, 공격하지 않는다.\n• 잠복 상태인 유닛과 인게이지된 적 유닛은 그 상태와 무관하게 정상적으로 공격할 수 있다.',
    },
  },
  {
    id: 'BURST FIRE Y" (X)',
    name: { en: 'BURST FIRE Y" (X)', ko: 'BURST FIRE Y" (X)' },
    definition: {
      en: 'When making a Ranged Attack against a target Within Y" of the attacking model, increase this weapon\'s RoA by X for that attack.',
      ko: '공격 모델로부터 Y" 이내의 대상에게 사격을 할 때, 그 공격의 RoA를 X만큼 늘린다.',
    },
  },
  {
    id: 'COHERENCY',
    name: { en: 'COHERENCY', ko: 'COHERENCY' },
    definition: {
      en: 'Coherency is checked at the end of any action that repositions models, including Move, Deploy, Charge, Disengage, Close Ranks, Run, PLACE, and SUMMON. At the end of such an action, all models in the Unit must be Wholly Within 3" of the Leading Model and able to trace a valid Coherency Link to it - if met, the Unit is In Coherency. A Unit with one or more models set beyond 3" (as close as possible while maintaining a valid Coherency Link) is Out of Coherency; Out of Coherency Units cannot control or contest Mission Markers. Casualties from any source never trigger a Coherency check and never cause a Unit to become Out of Coherency (Part 4.4).',
      ko: 'Coherency는 모델을 재배치하는 모든 행동(Move, Deploy, Charge, Disengage, Close Ranks, Run, PLACE, SUMMON 포함)이 끝날 때 확인한다. 그런 행동이 끝나면, 유닛의 모든 모델은 Leading Model로부터 3" 이내에 완전히(Wholly Within) 있어야 하고 그것까지 유효한 Coherency Link를 그을 수 있어야 한다 - 이 조건을 만족하면 그 유닛은 In Coherency 상태다. 하나 이상의 모델이 (유효한 Coherency Link를 유지하는 선에서 가능한 한 가깝게 놓았음에도) 3"를 벗어나 있는 유닛은 Out of Coherency 상태이며, Out of Coherency 유닛은 Mission Marker를 Control하거나 Contest할 수 없다. 어떤 원인으로 인한 casualty도 Coherency 확인을 유발하지 않으며, 유닛을 Out of Coherency로 만들지 않는다 (Part 4.4).',
    },
  },
  {
    id: 'COHERENCY LINK',
    name: { en: 'COHERENCY LINK', ko: 'COHERENCY LINK' },
    definition: {
      en: 'A Coherency Link is a chain of imaginary lines drawn model-to-model through models of the same Unit, used to check whether a model can legally be set In Coherency. Links cannot pass through models from other Units, terrain, or gaps that the Leading Model itself could not move through, though a link may pass through Enemy models the Unit is currently Engaged with. A model that cannot find a legal position while maintaining a valid Coherency Link is immediately removed as a casualty. For a Flying Unit, Coherency Links ignore terrain and may pass through models from other Units (Part 4.4).',
      ko: 'Coherency Link는 같은 유닛의 모델들을 모델 대 모델로 이어 그은 가상의 선들이며, 어떤 모델이 In Coherency 상태로 합법적으로 배치될 수 있는지 확인하는 데 쓰인다. Link는 다른 유닛의 모델, 지형, 또는 Leading Model 자신이 통과해서 이동할 수 없었을 틈을 통과할 수 없다. 다만 그 유닛이 현재 Engaged 상태인 적 모델은 통과할 수 있다. 유효한 Coherency Link를 유지하면서 합법적인 위치를 찾을 수 없는 모델은 즉시 casualty로 제거된다. Flying 유닛의 경우 Coherency Link는 지형을 무시하며 다른 유닛의 모델도 통과할 수 있다 (Part 4.4).',
    },
  },
  {
    id: 'COMBAT TAGS',
    name: { en: 'COMBAT TAGS', ko: 'COMBAT TAGS' },
    definition: {
      en: 'Combat Tags are keywords printed on a Unit Card that identify a Unit\'s physical nature and tactical class.\nType Tags: Armoured, Biological, Light, Mechanical, Psionic, Flying, and Ground.\n• Targeting: Some weapons can fire only at specific Combat Tags (e.g., "Target: Flying").\n• Surge: A weapon\'s Surge efficiency triggers only when the target has the Combat Tag listed in the weapon\'s Surge Type (Part 8.7.4).\n• Bonuses: Abilities such as ANTI-EVADE (X) or PIERCE (X) often apply only against specific Combat Tags.\nNote: The Ground Combat Tag and the GROUND LEVEL elevation (Part 8.5.3) are distinct concepts. A Flying Unit standing on the playmat is at GROUND LEVEL but does not have the Ground Combat Tag. Throughout these rules, Ground in bold always refers to the Combat Tag. GROUND LEVEL always refers to elevation.',
      ko: '유닛의 특성과 등급을 식별하기 위한 키워드이며, 다른 특수 효과의 발동 조건을 표기하는 데도 쓰인다.',
    },
  },
  {
    id: 'CONCENTRATED FIRE (X)',
    name: { en: 'CONCENTRATED FIRE (X)', ko: 'CONCENTRATED FIRE (X)' },
    definition: {
      en: 'Attacks with this weapon may remove no more than X models as casualties. Once X models have been removed, discard any remaining Total Damage. It is not recorded as a Damage Marker and does not carry over.',
      ko: '이 무기를 사용한 공격으로는 최대 X개의 모델까지만 제거할 수 있다. 그 이상으로 데미지가 발생해도 남은 총 데미지는 사라진다.',
    },
  },
  {
    id: 'CONTROLLING PLAYER',
    name: { en: 'CONTROLLING PLAYER', ko: 'CONTROLLING PLAYER' },
    definition: {
      en: 'The player who commands a specific Unit, model, or Token. They make all decisions and roll all dice. Certain abilities (e.g., Neural Parasite) can transfer control; the new controller then acts in every respect as though the Unit were their own.',
      ko: '특정 모델이나 토큰 등을 조종하는 플레이어를 나타낸다. 특수 효과로 조종하는 플레이어가 바뀌면, 새 조종자는 그것을 자신의 유닛처럼 다룬다.',
    },
  },
  {
    id: 'CRITICAL HIT (X)',
    name: { en: 'CRITICAL HIT (X)', ko: 'CRITICAL HIT (X)' },
    definition: {
      en: 'Move X dice from the Armour Pool directly to the Damage Pool, bypassing Armour. CRITICAL HIT can never move more dice than are in the Armour Pool.',
      ko: '아머 풀에서 굴려야 할 주사위 중 X개를 곧바로 데미지 풀로 옮긴다. 아머 풀에 남은 주사위 수보다 많이 옮길 수는 없다.',
    },
  },
  {
    id: 'CURRENT SUPPLY VALUE',
    name: { en: 'CURRENT SUPPLY VALUE', ko: 'CURRENT SUPPLY VALUE' },
    definition: {
      en: 'The Current Supply Value of a Unit is its Supply Value at this moment, based on the number of models remaining in the Unit as shown on the Supply Profile (Part 6.1). Update the Current Supply Value immediately whenever a casualty reduces the model count into a lower bracket.\nThe Current Supply Value is referenced when checking whether a Unit may be deployed from Reserves (Part 8.3.2), when determining Mission Marker Control (Part 8.9.1), when evaluating Tactical Mass for Disengage (Part 8.5.4), and when calculating Victory Points for Supply-based scoring conditions.',
      ko: '유닛에 남은 모델 수를 기준으로 한 현재 시점의 서플라이값이다. 모델 수가 줄어들어 이 수치가 바뀌어야 한다면 즉시 반영한다. 리저브 배치나 미션 마커 점령 판정 등에 쓰인다.',
    },
  },
  {
    id: 'DAMAGE POOL',
    name: { en: 'DAMAGE POOL', ko: 'DAMAGE POOL' },
    definition: {
      en: "The third of the three dice pools used to resolve an attack. Each die remaining in the Damage Pool inflicts Damage equal to the weapon's Damage characteristic. If the target Unit is eligible for an Evade Roll, the defender rolls all dice in the Damage Pool against the Unit's Evade characteristic before Damage is applied - each die that meets or exceeds the Evade value is removed, and the remaining dice are confirmed Damage (Part 8.7.4).",
      ko: '공격을 처리할 때 사용하는 세 개의 주사위 풀 중 세 번째 풀. Damage Pool에 남은 주사위 하나마다 무기의 Damage 특성치만큼 Damage를 입힌다. 대상 유닛이 Evade Roll을 할 자격이 있다면, Damage를 적용하기 전에 방어자는 Damage Pool의 모든 주사위를 그 유닛의 Evade 특성치에 대해 굴린다 - Evade 수치 이상이 나온 주사위는 제거되고, 남은 주사위만큼 Damage가 확정된다 (Part 8.7.4).',
    },
  },
  {
    id: 'DEBUFF [Characteristic] (X)',
    name: { en: 'DEBUFF [Characteristic] (X)', ko: 'DEBUFF [Characteristic] (X)' },
    definition: {
      en: 'The Unit suffers a penalty of X to the specified characteristic until the End of the Round.\n• Target Number characteristic: increase the value by X (harder to roll).\n• Value characteristic: decrease the value by X (minimum 0).',
      ko: '라운드 종료까지 [명시된 능력치]를 X만큼 약화시킨다. 아머나 힛 같은 목표 수치형 능력치는 증가로 작용하고, 스피드 등의 수치형 능력치는 감소로 작용한다.',
    },
  },
  {
    id: 'DISPLACEMENT',
    name: { en: 'DISPLACEMENT', ko: 'DISPLACEMENT' },
    definition: {
      en: 'The Leading Model may end a move overlapping this Token or Unit (overrides Part 7.3.1).\nIf the Leading Model ends any Move, Deploy, Run, Charge, Disengage, Close Ranks or Special Ability move overlapping this Token or model, the controlling player of the Leading Model immediately sets it in Base-to-Base contact with the Leading Model. If Base-to-Base is not possible, set it as close as possible.',
      ko: '리딩 모델은 이 키워드를 지닌 토큰이나 유닛과 겹친 채로 이동을 마칠 수 있다. 그렇게 했다면 변위 상태인 그 토큰이나 유닛은 리딩 모델과 베이스가 맞닿도록 밀려나듯이 놓이며, 베이스 접촉이 불가능하다면 최대한 가까운 곳에 놓는다.',
    },
  },
  {
    id: 'DODGE (X)',
    name: { en: 'DODGE (X)', ko: 'DODGE (X)' },
    definition: {
      en: 'When this Unit is targeted by an attack, reduce the number of dice moved from the Armour Pool to the Damage Pool by Surge or CRITICAL HIT by X (minimum 0). Apply during the Resolve Surge step.',
      ko: '이 능력을 지닌 유닛이 공격의 대상이 되었을 때, 크리티컬 힛이나 서지로 인해 아머 풀에서 데미지 풀로 옮겨지는 주사위 수를 X만큼 줄인다 (최소 0).',
    },
  },
  {
    id: 'EFFECTIVE SIZE',
    name: { en: 'EFFECTIVE SIZE', ko: 'EFFECTIVE SIZE' },
    definition: {
      en: "A model's Effective Size is equal to its Size characteristic plus the Size of any terrain it is standing on (Part 7.1.2).\nA model at GROUND LEVEL has an Effective Size equal to its own Size characteristic only. A model on HIGH GROUND (Size 3+) or MID GROUND (Size 1–2) adds the terrain's Size to its own. Terrain pieces set on elevated surfaces stack in the same way- a terrain piece's Effective Size equals its own Size plus the Size of the terrain it stands on.\nEffective Size determines which terrain blocks Line of Sight through Full Cover and Direct Cover (Part 7.1.1). Flying models are treated as having an Effective Size higher than any terrain piece on the table for Cover purposes (Part 7.1.4).",
      ko: '모델 자체의 사이즈에, 그 모델이 올라서 있는 지형의 사이즈를 더한 수치다. 지면에 있다면 모델 자신의 사이즈만, 고지대에 있다면 그 지형의 사이즈가 더해진다. 이 유효 사이즈는 커버 판정 등에 쓰인다. 비행 모델은 항상 전장의 어떤 지형보다도 큰 것으로 취급된다.',
    },
  },
  {
    id: 'ELEVATION LEVEL',
    name: { en: 'ELEVATION LEVEL', ko: 'ELEVATION LEVEL' },
    definition: {
      en: 'Models can stand one of three elevations:\n• GROUND LEVEL: Standing directly on the playmat.\n• MID GROUND: Standing on horizontal terrain of Size 1 or 2.\n• HIGH GROUND: Standing on horizontal terrain of Size 3 or larger.\nThe model stands on Elevation if its base is at that elevation. If the model\'s base is on multiple elevation levels, assume it is standing on the highest of those elevations.',
      ko: '모델이 서 있을 수 있는 세 가지 고도 단계를 뜻한다. 지면(전장 바닥 위), 중간지대(사이즈 1~2), 고지대(사이즈 3 이상)로 나뉜다. 베이스가 여러 단계에 걸쳐 있다면 더 높은 쪽으로 측정한다.',
    },
  },
  {
    id: 'ENEMY',
    name: { en: 'ENEMY', ko: 'ENEMY' },
    definition: {
      en: 'All Units, Tokens, and cards belonging to the opponent are Enemies. In team games, all opposing players\' Units, Tokens, and cards are Enemies. A Unit may never target a Friendly Unit with an attack unless a rule explicitly states otherwise. Enemy is the opposite of Friendly and is referenced throughout the rules to determine valid targets, Engagement, and Mission Marker contests.',
      ko: '상대가 지닌 유닛, 토큰, 카드 등을 나타낸다. 규칙이 달리 명시하지 않는 한, 아군 유닛은 공격의 대상으로 삼을 수 없다. 유효한 대상을 판정하는 데 쓰이는 키워드다.',
    },
  },
  {
    id: 'ENGAGED',
    name: { en: 'ENGAGED', ko: 'ENGAGED' },
    definition: {
      en: 'A Ground Unit is Engaged when any of its models is Within 1" (Engagement Range) of any model in an Enemy Ground Unit, provided the following conditions are met (Part 7.2.1):\n• Combat Tags match: Ground models Engage only Ground models. Flying models cannot be Engaged by any model.\n• Terrain does not block: Size 2+ terrain between the models prevents Engagement, even if they are Within 1". Models on HIGH GROUND cannot Engage models at GROUND LEVEL, and vice versa.\nWhen any model in a Unit is Engaged, the entire Unit is considered Engaged. An Engaged Unit cannot perform a standard Move - it must Disengage (Part 8.5.4) or Hold. Engaged Units are also subject to restrictions on Ranged Attacks (Part 8.7.3).',
      ko: '지상 유닛의 모델이 하나라도 적 지상 유닛의 모델과 1"(인게이지 거리) 이내에 있고, 두 단계 이상의 지형이나 고도 차이로 막혀 있지 않다면 인게이지 상태다. 유닛 중 한 모델이라도 인게이지 상태라면 그 유닛 전체가 인게이지된 것으로 취급되며, 일반적인 이동이 불가능해지고 이탈이나 대기만 할 수 있다. 또한 사격에도 제한을 받는다.',
    },
  },
  {
    id: 'ENGAGEMENT RANGE',
    name: { en: 'ENGAGEMENT RANGE', ko: 'ENGAGEMENT RANGE' },
    definition: {
      en: 'The Engagement Range extends 1" horizontally from any model\'s base. When two Enemy Ground models are Within each other\'s Engagement Range, they are Engaged (Part 7.2).\nEngagement Range is measured horizontally from a top-down perspective, ignoring vertical height (Part 4.1). It is referenced when resolving Move restrictions (Part 8.5.3), Disengage (Part 8.5.4), Charge (Part 8.6.2), the Fighting Rank (Part 8.8.1), and PLACE effects. Melee weapons list E as their Range, indicating they may only strike targets Within the Engagement Range.',
      ko: '베이스의 수평 1" 범위이다. 이 범위 안에 적 지상 모델이 들어오면 인게이지 상태가 된다. 이 측정에는 높이를 무시하고 수평 거리만을 측정한다. 이것은 이동 제한, 이탈, 차지, 전열을 측정하는 데 사용된다. 근접 무기의 사거리 E는 이것을 의미한다.',
    },
  },
  {
    id: 'ENTRY EDGE',
    name: { en: 'ENTRY EDGE', ko: 'ENTRY EDGE' },
    definition: {
      en: 'The table edge assigned to a player by the Deployment Card. Units enter the battlefield from this edge when deploying from Reserves.',
      ko: '배치 카드에 의해 지정된 각 플레이어의 전장의 가장자리이다. 리저브된 유닛이 전장에 배치될 때 이곳을 거친다.',
    },
  },
  {
    id: 'EVADE ROLL',
    name: { en: 'EVADE ROLL', ko: 'EVADE ROLL' },
    definition: {
      en: 'A defensive roll made in the Damage Pool step of an attack, performed only if the target Unit qualifies: either a Special Ability or keyword grants an Evade Roll, or the target is Engaged and suffering Damage from a Ranged Attack. The defender rolls all dice in the Damage Pool against the Unit\'s Evade characteristic; each die that meets or exceeds the Evade value is a success and is removed (Part 8.7.4).',
      ko: '공격의 Damage Pool 단계에서 이루어지는 방어 굴림으로, 대상 유닛이 다음 조건 중 하나를 만족할 때만 진행한다: Special Ability나 키워드가 Evade Roll을 부여하거나, 대상이 Engaged 상태에서 Ranged Attack으로 인한 Damage를 받고 있을 때. 방어자는 Damage Pool의 모든 주사위를 그 유닛의 Evade 특성치에 대해 굴린다; Evade 수치 이상이 나온 주사위는 성공으로 제거된다 (Part 8.7.4).',
    },
  },
  {
    id: 'FACTION INDICATOR',
    name: { en: 'FACTION INDICATOR', ko: 'FACTION INDICATOR' },
    definition: {
      en: 'A Marker used on Mission Markers to show which player currently controls that Mission Marker. Some Special Abilities also use Faction Indicators to mark an area of the battlefield (Part 7.3.2).',
      ko: '어느 플레이어가 그 Mission Marker를 현재 Control하고 있는지 표시하기 위해 Mission Marker 위에 놓는 마커. 일부 Special Ability는 전장의 특정 구역을 표시하기 위해 Faction Indicator를 사용하기도 한다 (Part 7.3.2).',
    },
  },
  {
    id: 'FACTION TAGS',
    name: { en: 'FACTION TAGS', ko: 'FACTION TAGS' },
    definition: {
      en: 'Faction Tags are keywords printed on Unit Cards, Tactical Cards, and Faction Cards that identify allegiance.\n• Race Tags: Terran, Zerg, Protoss.\n• Sub-Faction Tags: Specific broods or organisations, e.g., Kerrigan\'s Swarm, Raynor\'s Raiders.\n• Function: During Army Building, a player may include only Units and Tactical Cards whose Faction Tags all appear on the chosen Faction Card. If even one tag on the Unit or Tactical Card does not appear on the Faction Card, that card cannot be included. A Unit with fewer tags than the Faction Card is permitted- it only requires its own tags to be present (Part 9.1.2).',
      ko: '팩션을 식별하는 키워드이다. 아미 구성 시 이 팩션 키워드가 전부 같아야 한다. 서브팩션 등의 키워드는 한 아미에 하나만 존재 가능하다. 즉 서로 다른 서브팩션 키워드를 지닌 동일 팩션은 구성이 불가능하다.',
    },
  },
  {
    id: 'FIGHTING RANK',
    name: { en: 'FIGHTING RANK', ko: 'FIGHTING RANK' },
    definition: {
      en: 'A model is in the Fighting Rank if it is Within the Engagement Range (1") of an Enemy model. Models in the Fighting Rank may strike with their Combat Phase weapons. See Part 8.8.1, Step 2.',
      ko: '인게이지 거리 안에 있는 모델의 위치를 표현하는 키워드이다. 전열에 있는 모델만이 그 유닛의 근접전에서 근접무기로 공격할 수 있다.',
    },
  },
  {
    id: 'FIRST PLAYER MARKER',
    name: { en: 'FIRST PLAYER MARKER', ko: 'FIRST PLAYER MARKER' },
    definition: {
      en: 'A physical Token used to track which player has initiative. At the start of the game, the winner of the Roll-Off (Part 3.2) assigns the First Player Marker to either player for Round 1. The holder of the First Player Marker chooses which player activates first at the start of each Phase. The Marker changes hands in two ways: the first player to Pass during Phase 1 or Phase 2 takes the First Player Marker for the following Phase, and at the end of Phase 4 the Marker is awarded to the player with fewer Victory Points (Part 8.9.6). If Victory Points are tied, both players Roll-Off and the winner takes the Marker.',
      ko: '턴의 주도권을 나타내는 마커이다. 이 마커를 지닌 플레이어가 각 페이즈마다 먼저 활성화될 유닛을 고른다.',
    },
  },
  {
    id: 'FLYING',
    name: { en: 'FLYING', ko: 'FLYING' },
    definition: {
      en: "Flying Units trade board control (no Mission Markers, no melee) for mobility and immunity to terrain.\n• A Flying Unit ignores all terrain for movement purposes. The Leading Model moves point-to-point, measuring horizontally. Other models may pass through a Flying model's base as if it were not there, and vice versa.\n• A Flying Unit is never Engaged. Ground models cannot Engage Flying models, and Flying models cannot Engage other Flying models. A Flying Unit must end its movement at least 1\" away from all Enemy Flying Units.\n• Flying model, ignore the Full Cover rule. Direct Cover and the Elevation Dead Zone rules still apply. Assume that Flying Units' Effective Size is higher than the Effective Size of any terrain piece on the table.\n• A Flying Unit does not benefit from HIGH GROUND Cover (Part 7.1.3).\n• A Flying Unit cannot Control or Contest Mission Markers (overrides Parts 6.2 and 8.9.1).\n• A Flying Unit cannot Charge or be Charged.\n• A Flying Unit cannot participate in the Combat Phase (Part 8.8).\n• A Flying Unit ignores elevation. It does not use Access Points. For Cover and Line of Sight purposes, treat a Flying unit's Effective Size as higher than the Effective Size of any terrain piece on the table (Part 7.1.4). Terrain does not contribute to a Flying model's Effective Size.\n• A Flying Unit moving over Grass does not destroy the Grass terrain piece. If a Flying Unit ends on a Grass terrain piece, it is removed as normal.",
      ko: '• 기동성을 얻는 대신 전장 장악력(미션 마커, 근접)을 포기한다.\n• 지형과 다른 모델을 무시하고 이동하며, 절대 인게이지 되지 않는다.\n• 비행 유닛의 리딩 모델은 이동 거리를 수평 거리만 측정하며 궤도 없이 바로 이동한다. 다른 모델은 비행 유닛의 모델을 존재하지 않는 것처럼 통과할 수 있고, 반대도 마찬가지다.\n• 비행 유닛은 다른 비행 유닛으로부터 1" 떨어지게 이동을 마쳐야 한다.\n• 차지나 컴뱃 페이즈 공격을 할 수 없으며 미션 마커 점령도 불가능하다.\n• 시야 판정 시 유효 사이즈가 가장 높은 것으로 간주되며 전체 커버를 무시한다. 단 직접 커버와 고지대 커버는 무시하지 않는다.\n• 비행 유닛은 미션 마커를 경쟁하거나 제어할 수 없고, 차지를 하거나 차지의 목표가 되지 못한다.\n• 고도를 무시하며 액세스 포인트도 사용하지 않는다. 커버와 시야 판정에서 비행 유닛의 유효 사이즈는 전장의 어느 지형보다도 큰 것으로 친다. 풀숲 위를 지나더라도 지형을 파괴하지 않는다. 하지만 그 위에서 이동을 마친다면 풀숲은 정상적으로 사라진다.',
    },
  },
  {
    id: 'FRIENDLY',
    name: { en: 'FRIENDLY', ko: 'FRIENDLY' },
    definition: {
      en: "All Units, Tokens, and cards belonging to the Controlling Player are Friendly to one another. In team games, all teammates' Units, Tokens, and cards are also Friendly. A Unit's own models are always Friendly to it. Friendly is the opposite of Enemy and is used throughout the rules to determine targeting restrictions, movement interactions, and ability eligibility.",
      ko: '조종하는 플레이어의 유닛, 카드, 토큰을 지정한다.',
    },
  },
  {
    id: 'GAP CLEARANCE',
    name: { en: 'GAP CLEARANCE', ko: 'GAP CLEARANCE' },
    definition: {
      en: 'A gap is any physical space between terrain pieces or models through which a model\'s path of movement passes. The Leading Model can pass through a gap depending on the Unit\'s Size: Size 2 or lower requires a gap at least 1" wide; Size 3 or larger requires a gap at least 3" wide. This applies to Move, Run, Charge, Disengage, and Close Ranks. Flying Units ignore Gap Clearance during movement (Part 4.6).',
      ko: 'gap(틈)이란 모델의 이동 경로가 지나가는, 지형물이나 모델 사이의 물리적 공간을 말한다. Leading Model이 gap을 통과할 수 있는지는 유닛의 Size에 따라 다르다: Size 2 이하는 폭 1" 이상의 gap이 필요하고, Size 3 이상은 폭 3" 이상의 gap이 필요하다. 이는 Move, Run, Charge, Disengage, Close Ranks에 모두 적용된다. Flying 유닛은 이동 중 Gap Clearance를 무시한다 (Part 4.6).',
    },
  },
  {
    id: 'GRASS',
    name: { en: 'GRASS', ko: 'GRASS' },
    definition: {
      en: "A terrain piece with a Size of 2 that follows special rules. Unlike other Size 2 terrain, Grass does not block movement but does block Line of Sight, following the standard Cover rules (Part 7.1.1).\nGrass is destroyed by the passage of war. If a Leading Model's path of travel passes through or any model of a Unit ends on a Grass terrain piece during any movement action (Move, Deploy, Run, Charge, Disengage or Close Ranks), that Grass terrain piece is immediately removed from the game. It does not return during Cleanup & Refresh and cannot be replaced by any means.\nA Flying Unit moving over Grass does not destroy the Grass terrain piece. Flying models pass above the terrain, not through it. If any model of a Flying Unit ends on a Grass terrain piece, it is removed as normal.",
      ko: 'Size 2이면서 특수 규칙을 따르는 지형물. 다른 Size 2 지형과 달리 Grass는 이동을 막지 않지만, 표준 Cover 규칙(Part 7.1.1)에 따라 Line of Sight는 막는다.\nGrass는 전투가 지나가면 파괴된다. Leading Model의 이동 경로가 Grass 지형물을 통과하거나, 어떤 이동 행동(Move, Deploy, Run, Charge, Disengage, Close Ranks) 중에 유닛의 모델이 Grass 지형물 위에서 이동을 마치면, 그 Grass 지형물은 즉시 게임에서 제거된다. Cleanup & Refresh 때도 되돌아오지 않으며 어떤 방법으로도 다시 놓을 수 없다.\nFlying 유닛이 Grass 위로 지나가는 것만으로는 그 Grass 지형물이 파괴되지 않는다. Flying 모델은 지형을 통과하는 게 아니라 그 위를 지나가는 것으로 취급한다. Flying 유닛의 모델이 Grass 지형물 위에서 이동을 마치면 평소처럼 제거된다.',
    },
  },
  {
    id: 'GROUND LEVEL',
    name: { en: 'GROUND LEVEL', ko: 'GROUND LEVEL' },
    definition: {
      en: 'One of the elevation levels. Model is on the GROUND LEVEL when it is standing directly on the playmat.\nModels on GROUND LEVEL cannot Engage models on HIGH LEVEL, and vice versa. Models on GROUND LEVEL can Engage models on MID GROUND only if both models are adjacent to the same ACCESS POINT connecting their respective elevations.\nA model at GROUND LEVEL has an Effective Size equal to its own Size characteristic only.',
      ko: '플레이매트 위에 그대로 있는 상태이다. 중간지대의 대상과는 인게이지될 수 있지만 고지대 유닛과 인게이지 될 순 없다. 중간지대의 대상과 인게이지하기 위해선 각각의 고도를 연결하는 동일한 액세스 포인트에 인접해 있어야만 그 모델과 인게이지 할 수 있다. 지면에 있는 모델의 유효 사이즈는 자신의 온전한 사이즈만을 사이즈로 삼는다.',
    },
  },
  {
    id: 'HEAL (X)',
    name: { en: 'HEAL (X)', ko: 'HEAL (X)' },
    definition: {
      en: "Remove X points of accumulated Damage from the Unit (reduce its Damage Marker accordingly). HEAL cannot return Destroyed models - it only reduces existing Damage. See also: RESPAWN.",
      ko: '유닛에게 부여된 총 데미지를 X만큼 제거한다. 이 능력으로 파괴된 모델을 재생시킬 순 없다. 아직 모델을 죽일 정도로 쌓이지 않은, 그 유닛이 입은 누적된 데미지만을 지울 뿐이다.',
    },
  },
  {
    id: 'HIDDEN',
    name: { en: 'HIDDEN', ko: 'HIDDEN' },
    definition: {
      en: 'This Unit cannot be selected as the target of a Ranged Attack or any LoS-requiring Special Ability unless the acting model is Within 4" of it. A HIDDEN Unit is immune to the IMPACT keyword. A HIDDEN Unit may make an Evade Roll against every attack targeting it.\n• HIDDEN is classified as a Status.',
      ko: '공격자가 4" 이내에 있지 않는 한 사격이나 시야가 필요한 특수능력의 대상이 되지 않는다. 임팩트 키워드에 면역이며, 자신을 향한 모든 공격에 회피 롤이 가능하다.',
    },
  },
  {
    id: 'HIGH GROUND',
    name: { en: 'HIGH GROUND', ko: 'HIGH GROUND' },
    definition: {
      en: 'One of the elevation levels. Model is on the HIGH GROUND when standing on horizontal terrain of Size 3 or larger.\nModels on HIGH GROUND cannot Engage models on GROUND LEVEL, and vice versa. Models on HIGH GROUND can Engage models on MID GROUND only if both models are adjacent to the same ACCESS POINT connecting their respective elevations.\nA model on HIGH GROUND has an Effective Size equal to its own Size plus the terrain\'s Size.',
      ko: '사이즈 3 이상의 지형 위에 서 있는 상태이다. 중간지대의 대상과는 인게이지 될 수 있지만 고지대 유닛과 인게이지 될 순 없다. 중간지대의 대상과 인게이지하기 위해선 각각의 고도를 연결하는 동일한 액세스 포인트에 인접해 있어야만 그 모델과 인게이지 할 수 있다. 고지대에 있는 모델의 유효 사이즈는 자신의 온전한 사이즈에 지형의 사이즈를 더한 사이즈를 유효 사이즈로 삼는다.',
    },
  },
  {
    id: 'HITS X (Y)',
    name: { en: 'HITS X (Y)', ko: 'HITS X (Y)' },
    definition: {
      en: 'The affected Unit suffers X automatic hits. Set X dice directly into the Armour Pool and proceed immediately to Armour Rolls (Part 8.7.4, Steps 3–4). Treat the Damage characteristic as Y. These hits do not generate Surge.',
      ko: '효과를 받은 유닛은 X개만큼의 자동 명중을 당한다. X만큼의 주사위를 바로 아머 풀에 넣고 아머 롤을 진행한다. 데미지는 Y로 친다. 이 명중은 서지를 발동시키지 못한다.',
    },
  },
  {
    id: 'IMPACT (X) Y',
    name: { en: 'IMPACT (X) Y', ko: 'IMPACT (X) Y' },
    definition: {
      en: 'Immediately after this Unit completes a successful Charge, check every model in the Fighting Rank or Supporting Rank. For each eligible model, generate X Impact Dice:\n• If the model is in the Fighting Rank or Supporting Rank against only one Enemy Unit, all X dice go to that Unit.\n• If the model is in the Fighting Rank or Supporting Rank against multiple Enemy Units, the controlling player may split the dice between those Units.\nRoll the allocated dice for each target Unit separately (this is the Impact Hit Roll). For each result of Y or higher, set 1 die into the target\'s Armour Pool. Proceed immediately to Armour Rolls. These hits do not generate Surge and treat Damage as 1.',
      ko: '이 유닛이 차지를 성공적으로 마친 후, 전열과 지원열에 있는 모델을 확인한다. 해당되는 모델 수만큼 X개의 임팩트 주사위를 생성한다. 만약 한 유닛에게만 차지했다면 모든 임팩트 주사위를 그 대상 하나에게 배분한다. 두 유닛 이상에게 차지했다면 전체 주사위를 임의로 배분해서 처리할 수 있다. 적 유닛에게 배분된 주사위를 굴린다 (이 굴림을 임팩트 힛 롤이라고 한다). Y 이상의 결과가 나온다면 그 주사위를 아머 풀에 넣는다. 그 후 아머 롤을 진행한다. 이 명중은 서지를 발동시키지 않으며, 데미지는 1로 친다.',
    },
  },
  {
    id: 'IMPASSABLE TERRAIN',
    name: { en: 'IMPASSABLE TERRAIN', ko: 'IMPASSABLE TERRAIN' },
    definition: {
      en: 'A terrain piece is Impassable if it has no Access Point connecting it to an adjacent elevation level. Models cannot move through, onto, or across IMPASSABLE TERRAIN, and no model may end its movement overlapping it. Models can move through Terrain of Sizes 0 and 1.',
      ko: '지형물이 다른 고도와 연결되는 액세스 포인트를 지니고 있지 않다면 통과 불가능한 지형이다. 모델은 이를 뚫고 가거나 올라가거나 가로질러 이동할 수 없으며, 이 위에서 이동을 마칠 수도 없다. 만약 지형이 사이즈가 1 이하라면 통과해서 이동할 수 있다.',
    },
  },
  {
    id: 'INDIRECT FIRE',
    name: { en: 'INDIRECT FIRE', ko: 'INDIRECT FIRE' },
    definition: {
      en: 'Ranged Attacks with this weapon may ignore Line of Sight when selecting a target and resolving Damage. The target must still be Within Range. If the target is not within Line of Sight, it may make an Evade Roll against this attack.',
      ko: '이 무기를 사용한 사격은 대상을 선택할 때 시야를 무시하고 처리할 수 있다. 사거리는 그대로 측정한다. 이 공격에 공격당하는 대상은 시야 밖에서 공격당한다면 이 공격에 대해 회피 롤을 할 수 있다.',
    },
  },
  {
    id: 'INSTANT',
    name: { en: 'INSTANT', ko: 'INSTANT' },
    definition: {
      en: 'Enemy Units cannot declare or resolve Reaction abilities in response to attacks made with this weapon.',
      ko: '적은 이 무기로 행해지는 공격에 대해 리액션 능력을 사용할 수 없다.',
    },
  },
  {
    id: 'LEADING MODEL',
    name: { en: 'LEADING MODEL', ko: 'LEADING MODEL' },
    definition: {
      en: "The Leading Model is a temporary reference point used to execute a Unit's movement. Whenever a Unit performs a Move, Deploy, Run, Charge, Disengage, Close Ranks, or any action that instructs the Unit to nominate a Leading Model, the Controlling Player selects one model in the Unit.\nMove the Leading Model first, measuring its exact path. Then set the remaining models in valid Coherency around the Leading Model's new position (Part 4.4). The Leading Model nomination ends once the action resolves. The Leading Model determines the Unit's Gap Clearance category and interacts with terrain restrictions (Part 4.6).",
      ko: '리딩 모델은 유닛의 움직임에 사용되는 임시적인 기준점이다. 유닛이 이동, 배치, 질주, 차지, 이탈, 진형유지를 하거나, 리딩 모델을 지정하는 다른 액션을 할 때 조종하는 플레이어는 유닛 내의 임의의 한 모델을 리딩 모델로 선정한다. 이후 리딩 모델을 이동시키며 정확한 경로를 측정한다. 그 후 남은 모델을 그 리딩 모델의 주위에 코헤런시에 맞게 배치한다. 액션이 해결된 후엔 리딩 모델 설정이 종료된다.',
    },
  },
  {
    id: 'LINE OF SIGHT (LoS)',
    name: { en: 'LINE OF SIGHT (LoS)', ko: 'LINE OF SIGHT (LoS)' },
    definition: {
      en: "Line of Sight determines what a model can see and, by extension, what it can target with attacks and abilities.\nAll Line of Sight checks are resolved from a 2D top-down perspective, looking directly down at the battlefield from above. To determine if a model can see a target, trace an imaginary straight line from any part of the acting model's base to any part of the target model's base. Vertical height is never factored into the trace.\nIf the trace does not pass through any Blocking Terrain (any terrain piece with an Effective Size of 1 or greater), the target is Visible. No further checks are required.\nIf the trace passes through Blocking Terrain, the target is not automatically hidden. Apply the Cover rules (Part 7.1.1) to determine whether that terrain actually blocks the Line of Sight:\n• Full Cover: The terrain's Effective Size is equal to or greater than the Effective Size of both the attacker and the target. Line of Sight is blocked.\n• Direct Cover: The trace passes through a terrain piece, and either the attacker or the target is Within 1\" of that terrain, provided the terrain's Effective Size is equal to or greater than the Effective Size of the model that is Within 1\". Line of Sight is blocked. Exception: If both the attacker and the target are Within 1\" of the same terrain piece and Within 3\" of each other, resolve Line of Sight normally.\n• Elevation Dead Zone: A model on HIGH GROUND (Size 3+) cannot see a model at GROUND LEVEL that is Within 1\" of the base of the same terrain piece, and vice versa. The same Close Quarters exception applies.\nEach terrain piece is assessed independently. Terrain pieces do not combine their Effective Size or proximity. If no single terrain piece meets the requirements for Full Cover or Direct Cover, Line of Sight is not blocked, regardless of how many terrain pieces the trace passes through.\nA terrain piece's footprint is defined by its physical base or outermost edges viewed from above. Gaps, windows, doorways, and open interiors within the footprint do block the Line of Sight unless players agree otherwise during Battlefield Setup (Part 7.1).\nFlying models ignore the Full Cover rule. Direct Cover and the Elevation Dead Zone still apply. Treat a Flying model's Effective Size as higher than the Effective Size of any terrain piece on the table (Part 7.1.4).\nLine of Sight is mutual: if Model A can see Model B, Model B can see Model A through the same trace.",
      ko: '모델의 베이스의 아무 지점에서 목표 베이스의 아무 지점을 향해 상상의 직선을 긋는다. 이 직선은 수직 높이는 영향을 끼치지 않는다. 직선이 어떠한 시야 차단 지형(사이즈 1 이상의 지형)도 통과하지 않는다면 보인다. 차단 지형을 통과한다면 커버를 판정한다. 지형의 유효 사이즈가 공격자, 대상과 동일하거나 그보다 높다면 시야가 차단되며 완전 커버가 된다. 지형이 공격자나 대상의 1" 이내에 있고, 그 거리 안에 있는 모델의 유효 사이즈와 동일하거나 그보다 크다면 직접 커버가 된다. 각 지형은 독립적으로 커버를 평가하며, 판정에서 수치가 합쳐지는 경우는 존재하지 않는다. 직선이 지형을 아무리 많이 통과하더라도 위 두 조건의 대상이 되지 않는다면 커버를 받지 못한다. 지형의 풋프린트 안에 있는 지형의 틈, 창문 등은 전장 배치 중에 별다른 협의를 하지 않는 한 시야를 차단하는 것으로 판정한다. 비행 모델은 완전 커버를 무시하며 커버의 목적으로 전장의 어느 지형물보다도 더 큰 것으로 측정한다. 시야는 상호적이라 내가 상대를 볼 수 있다면 상대도 나를 볼 수 있다.',
    },
  },
  {
    id: 'LOCKED IN (X)',
    name: { en: 'LOCKED IN (X)', ko: 'LOCKED IN (X)' },
    definition: {
      en: 'When making a Ranged Attack with this weapon, add X to its RoA if the target Unit has Stationary Status.',
      ko: '이 무기로 사격을 할 때 대상 유닛이 정지 상태라면 이 무기의 RoA에 X만큼을 더한다.',
    },
  },
  {
    id: 'LONG RANGE (X)',
    name: { en: 'LONG RANGE (X)', ko: 'LONG RANGE (X)' },
    definition: {
      en: 'The maximum Range of this weapon increases to X".\nMeasure each attacking model\'s distance to the target individually:\n• Within normal profile Range: attack resolves normally.\n• Beyond profile Range but Within X": the model suffers a -1 Modifier to its Hit roll.\nIf a Batch contains models at both Standard and Long Range, generate the total dice but roll the two groups separately to account for different Hit Target Numbers.',
      ko: '이 무기의 사거리를 X"까지로 변경한다. 이렇게 늘어난 만큼의 사거리로 인해 가능해진 공격을 처리할 때 힛 롤에 -1의 수정치를 받는다. 유닛 내에 롱 레인지의 규칙이 적용되는 모델과 적용되지 않는 모델이 있다면 두 그룹을 따로 굴려야 한다.',
    },
  },
  {
    id: 'MID GROUND',
    name: { en: 'MID GROUND', ko: 'MID GROUND' },
    definition: {
      en: 'One of the elevation levels. Model is on the MID GROUND when standing on horizontal terrain of Size 1 or 2.\nModels on MID GROUND can Engage models on HIGH GROUND or GROUND LEVEL only if both models are adjacent to the same ACCESS POINT connecting their respective elevations.\nA model on MID GROUND has an Effective Size equal to its own Size plus the terrain\'s Size.',
      ko: '사이즈 1 이상, 사이즈 2 이하의 지형 위에 서 있는 상태이다. 고지대나 지면의 대상과는 인게이지 될 수 있다. 그 대상과 인게이지하기 위해선 각각의 고도를 연결하는 동일한 액세스 포인트에 인접해 있어야만 그 모델과 인게이지 할 수 있다. 중간지대에 있는 모델의 유효 사이즈는 자신의 온전한 사이즈에 지형의 사이즈를 더한 사이즈를 유효 사이즈로 삼는다.',
    },
  },
  {
    id: 'MISSION MARKERS',
    name: { en: 'MISSION MARKERS', ko: 'MISSION MARKERS' },
    definition: {
      en: 'Numbered Markers are set on the battlefield during Setup at the coordinates shown on the Deployment Card. Each Marker is 32mm in diameter and has two sides: Activated or Deactivated. Markers 1 & 3 are Red, Markers 2 & 4 are Blue, and Marker 5 is Neutral.\nMission Markers are the primary scoring mechanism. At the end of each Round, players determine Control of each Marker by comparing the Total Current Supply Value of their eligible contesting Units (Part 8.9.1). A Unit may Contest a Mission Marker only if it is on the battlefield, In Coherency, and has at least one model Within 3" with Line of Sight to the Marker on the same elevation. Flying Units and BURROWED Units cannot Contest or Control Mission Markers.\nControl is Sticky- once a player Controls a Marker, it remains under their control until the opponent reclaims it with a higher contesting Supply total. A tied result never transfers control.',
      ko: '번호가 매겨진 마커는 배치 카드에 표시된 위치에 따라 전장 설정 단계에서 전장에 배치된다. 마커의 지름은 32mm이며 활성화와 비활성화의 양면을 지닌다. 1, 3은 빨강, 2, 4는 파랑, 5는 중립이다. 마커는 점령할 수 있는 요소이며 점수 획득 수단이다. 각 라운드 종료 시 플레이어는 마커의 3" 이내에 있는 모델들을 사용해서 제어권을 경쟁한다. 경쟁하기 위해선 그 유닛이 코헤런시를 유지하며 마커와 동일한 고도이며 마커에 대해 시야가 확보되어야 한다. 비행 유닛과 잠복 중인 유닛은 경쟁하거나 제어할 수 없다. 제어권은 유지되며, 한번 플레이어가 마커를 제어하면 상대가 더 높은 경쟁을 위한 서플라이값으로 경쟁에서 승리해서 제어권을 찾기 전까지는 그 제어권이 사라지지 않는다.',
    },
  },
  {
    id: 'MODIFIER',
    name: { en: 'MODIFIER', ko: 'MODIFIER' },
    definition: {
      en: 'A Modifier adjusts the Target Number of a roll. Apply all Modifiers before rolling (Part 3.4).\n• +X Modifier: Makes the roll easier by reducing the Target Number by X.\n• -X Modifier: Makes the roll harder by increasing the Target Number by X.\nModifiers from different named sources are cumulative unless otherwise stated. A Target Number can never be modified below 2+ or above 6+. Modifiers adjust the Target Number, not the dice result. A natural roll of 6 always succeeds, and a natural roll of 1 always fails, regardless of Modifiers (Part 3.6).\nA Modifier is distinct from a Fixed Addition (Part 3.5), which generates a value rather than adjusting a Target Number.',
      ko: '수정치는 주사위의 결과값에 적용되는 수치이다. 이 수치는 주사위를 굴리기 전에 적용해서 성공 여부를 가른다. 수정치를 통해 수정되는 수치는 2+에서 6+를 벗어난 값이 될 수 없다. 수정되지 않은 1은 언제나 실패이며 수정되지 않은 6은 언제나 성공이다. 수정치는 고정가감과는 다르게 작용한다.',
    },
  },
  {
    id: 'Morph (Name)',
    name: { en: 'Morph (Name)', ko: 'Morph (Name)' },
    definition: {
      en: 'The controlling player must have sufficient Available Supply. Set one (Name) model in Base-to-Base contact with a model from the active Unit, then remove that model from the battlefield. The (Name) model forms a new Unit and cannot be set Within 1" of any Enemy Unit. Place an Activation Marker next to the new Unit; it cannot be Activated for the remainder of the Round.',
      ko: '조종하는 플레이어는 충분한 서플라이를 지녀야 한다. 활성화된 유닛과 베이스 접촉되게 (이름) 모델을 하나 배치한 후, 활성화된 모델을 전장에서 제거한다. 이렇게 배치된 유닛은 새로운 유닛을 형성하며 적 유닛의 1" 이내에 배치될 수 없다. 이렇게 배치된 유닛은 활성화 마커를 옆에 두고 그 유닛은 라운드의 남은 기간 동안 활성화 될 수 없다.',
    },
  },
  {
    id: 'NON-LETHAL DAMAGE (X)',
    name: { en: 'NON-LETHAL DAMAGE (X)', ko: 'NON-LETHAL DAMAGE (X)' },
    definition: {
      en: "The Unit suffers X points of Damage. Add this amount effectively to the Unit's Damage Marker. Do not remove any models, even if Total Damage exceeds a model's HP. If the Unit subsequently suffers standard Damage, the combined Total Damage triggers casualty removal normally.",
      ko: '유닛은 X만큼 데미지를 받는다. 이 양을 기존에 지닌 데미지 마커에 더한다. 총 데미지가 모델의 헬스를 넘더라도 모델을 제거하지 않는다. 이후 그 유닛이 일반적인 데미지를 받을 경우 논 리썰 데미지로 발생한 데미지는 일반적인 데미지처럼 모델을 지우게 된다.',
    },
  },
  {
    id: 'ON CREEP',
    name: { en: 'ON CREEP', ko: 'ON CREEP' },
    definition: {
      en: 'A Friendly or Enemy Ground Zerg Unit is considered to be ON CREEP while it is Within 6" of any Creep Tumor Token or any model designated as a Source of Creep. While satisfying this condition, the Unit gains the ON CREEP keyword. This allows the Unit to trigger specific Special Abilities or Upgrades that require this state.',
      ko: '지상 저그 유닛이 아무런 점막 종양 토큰, 혹은 점막 생성원으로 지정된 토큰이나 모델 등의 6" 이내에 있다면 점막 위에 있는 것으로 친다. 이후 점막 위에 있는 것으로 발동하는 조건이 발동된다.',
    },
  },
  {
    id: 'PIERCE [TAG] X',
    name: { en: 'PIERCE [TAG] X', ko: 'PIERCE [TAG] X' },
    definition: {
      en: "When attacking a Unit with the specified Combat Tag, treat this weapon's Damage characteristic as X.",
      ko: '태그에 해당되는 적을 목표로 공격할 때 그 무기의 데미지를 X로 만든다.',
    },
  },
  {
    id: 'PINPOINT',
    name: { en: 'PINPOINT', ko: 'PINPOINT' },
    definition: {
      en: 'Ranged Attacks with this weapon may target Engaged Enemy Units, ignoring the standard Engagement Status restriction (overrides Part 8.7.3, Step 1).',
      ko: '이 무기를 사용한 사격은 인게이지 상태의 제한을 무시하고 인게이지된 적 유닛을 공격 목표로 삼을 수 있다.',
    },
  },
  {
    id: 'PLACE (X)',
    name: { en: 'PLACE (X)', ko: 'PLACE (X)' },
    definition: {
      en: 'Choose a Leading Model. Remove it and set it Wholly Within X" of its starting position. Then remove and replace all other models in the Unit, maintaining Coherency (Part 4.4). PLACE ignores Gap Clearance, and elevation requirements. The Leading Model is removed and set directly, not moved along a path. However, they must end in a legal position and not Within the Engagement Range of any enemy model. Models using the PLACE effect during the Assault Phase may be set Within the Engagement Range of Enemy models (the Unit becomes Engaged) unless stated otherwise.',
      ko: '리딩 모델을 하나 고른다. 그 모델을 전장에서 제거하고 능력을 시작했던 위치에서 X" 이내에 완전히 들어오게 다시 배치한다. 그 후 다른 모델을 코헤런시에 맞게 리딩 모델의 주변에 다시 배치한다. 위치를 통한 움직임은 궤도가 존재하지 않는다. 위치는 적합한 위치에 놓여져야 하며 인게이지 거리 안에서 배치를 마칠 수 없다. 다만 어썰트 페이즈 중 위치 효과를 사용하는 모델은 인게이지 거리에 배치를 마칠 수 있으며, 이것은 인게이지 상태를 유발한다.',
    },
  },
  {
    id: 'PRECISION (X)',
    name: { en: 'PRECISION (X)', ko: 'PRECISION (X)' },
    definition: {
      en: 'After rolling to Hit, move up to X failed Attack Dice directly into the Armour Pool. Treat them as successful Hits for all purposes, including Surge.',
      ko: '힛 롤을 굴린 후, 최대 X개의 실패한 공격 주사위를 아머 풀로 이동시킨다. 이것은 서지를 포함한 모든 목적에서 성공한 힛으로 취급한다.',
    },
  },
  {
    id: 'READY',
    name: { en: 'READY', ko: 'READY' },
    definition: {
      en: 'The default state of a Tactical Card or Faction Card. A Ready card is face-up, its abilities are available, and it may be Exhausted to pay resource costs or activate its Special Abilities. All Tactical Cards and Faction Cards begin each Round in the Ready state. Cards that have been Exhausted are returned to Ready during Cleanup & Refresh (Part 8.9.5).',
      ko: '택티컬 카드나 팩션 카드의 기본적인, 사용되기 위해 준비된 상태이다. 이 상태의 카드는 앞면을 향하고 있다. 매 라운드마다 준비 상태로 시작하며 특수 능력이나 자원을 얻기 위해 탈진될 수 있다. 탈진 상태의 카드는 정리 페이즈에서 다시 준비 상태로 돌아간다.',
    },
  },
  {
    id: 'REPEATABLE',
    name: { en: 'REPEATABLE', ko: 'REPEATABLE' },
    definition: {
      en: 'This ability is exempt from the Once Per Round limit (Part 2.7.1). It may be used multiple times per Round and per Activation, provided all Costs and trigger conditions are met each time.',
      ko: '이 능력은 라운드당 한 번의 사용 제약을 무시한다. 소모하는 비용과 발동 조건이 맞다면 몇 번이고 사용할 수 있다.',
    },
  },
  {
    id: 'RESERVES',
    name: { en: 'RESERVES', ko: 'RESERVES' },
    definition: {
      en: 'A holding area off the battlefield where Units remain until they are deployed. All Units begin the game in Reserves.\nWhile in Reserves, a Unit:\n• Cannot be targeted by attacks or abilities unless an ability explicitly states it affects Units in Reserves.\n• Cannot use Active Abilities, Passive Abilities, or Reaction Abilities unless the ability explicitly states otherwise.\n• Cannot Control or Contest Mission Markers.\n• Does not contribute its Current Supply Value to the player\'s Total Current Supply on the battlefield.\n• Retains all equipment, upgrades, and weapon selections assigned during Army Building.\nA Unit leaves Reserves when it is deployed to the battlefield via a Deploy action (Part 8.5.5). Some rules may return a Unit to Reserves during play- see Part 8.5.5 for how Damage, effects, and Supply are handled. In the final Round of the game, all Units still in Reserves that are not deployed are treated as Destroyed for scoring purposes (Part 8.10).',
      ko: '유닛이 배치되기 전까지 머무는 전장 밖의 대기 구역이다. 모든 유닛은 리저브에서 시작한다. 리저브 중인 유닛은 명시되지 않는 한 아무런 능력의 영향을 줄 수도 받을 수도 없다. 명시되지 않는 한 어떠한 능력도 발동시킬 수 없다. 명시되지 않는 한 미션 마커 제어나 경쟁할 수 없다. 전장의 현재 총 서플라이값에 기여하지 않는다. 유닛은 배치 능력을 통해 리저브에서 전장으로 떠날 수 있다. 특정한 능력을 이용해 전장에서 리저브로 되돌아갈 수 있다. 게임의 종료 시 마지막까지 리저브에 남아 있는 모든 유닛은 점수 계산을 위해서 파괴된 것으로 취급된다.',
    },
  },
  {
    id: 'RESPAWN (X)',
    name: { en: 'RESPAWN (X)', ko: 'RESPAWN (X)' },
    definition: {
      en: "Return up to X Destroyed models to this Unit.\n• The return cannot increase the Unit's Current Supply Value. Do not return a model if doing so would push the Unit into a higher Supply bracket.\n• Set each returned model in Base-to-Base contact with an existing model in the Unit. Returned models cannot be set Within the Engagement Range of any Enemy Unit.\n• If a model cannot be set legally, it cannot be returned.",
      ko: '그 유닛의 파괴된 모델을 X개까지 유닛에 복귀시킨다. 유닛의 서플라이값을 넘어서 복귀시킬 수 없다. 만약 모델 복귀로 인해 서플라이값이 변동하게 되는 경우 모델은 복귀되지 못한다. 복귀한 각 모델은 기존에 남은 다른 모델과 베이스 접촉되게 놓인다. 복귀한 각 모델은 적과 인게이지되지 못한다. 일반적으로 배치될 수 없는 모델은 복귀되지 못한다.',
    },
  },
  {
    id: 'SHIELDED',
    name: { en: 'SHIELDED', ko: 'SHIELDED' },
    definition: {
      en: 'If a Shield value is present on a Unit Card, add it to the Hit Points (HP) of the first model. The Unit is Shielded. The Unit loses its Shielded Status when the Total Damage assigned to it exceeds its Shield value or when the first model in the Unit is removed.\nThe Shielded Status is referenced by other abilities. Losing Shielded Status does not remove any remaining Hit Points, it only ends effects that require the Unit to be Shielded. Shielded Status cannot be restored by HEAL.',
      ko: '유닛에 보호막 수치가 존재한다면 그 유닛의 첫 번째로 데미지가 할당될 모델의 HP에 그 수치를 더한다. 그 유닛은 보호막 상태가 된다. 유닛에게 할당된 총 데미지의 양이 보호막의 수치 이상이 되거나, 유닛 내 첫 모델이 제거될 때 유닛은 보호막 상태를 잃는다. 보호막 상태를 잃는다고 남은 체력이 제거되는 것은 아니며 보호막 상태를 요구하는 능력만을 종료시킨다. 보호막 상태는 치유를 통해 복구될 수 없다.',
    },
  },
  {
    id: 'SIDEARM',
    name: { en: 'SIDEARM', ko: 'SIDEARM' },
    definition: {
      en: 'When this Unit performs a Ranged Attack or Close Combat Attack, models equipped with this weapon may use it, ignoring the normal restriction of one weapon per model (Part 8.7.3). If a model is equipped with multiple SIDEARM weapons, it may use all of them in the same activation.\nAttacks made with each SIDEARM must be resolved in separate Batches. Because they are separate Batches, SIDEARM attacks may target a different Enemy Unit than the Unit\'s other weapons, subject to all standard target eligibility requirements.',
      ko: '이 키워드를 지닌 무기를 사용할 때, 모델이 지닌 하나의 무기만을 사용 가능하다는 규칙을 무시하고 추가로 이 무기를 사용할 수 있다. 사이드암 무기를 여러 개 지녔다면 그 각각을 사용할 수 있다. 사이드암으로 인한 공격은 별개의 굴림으로 처리한다.',
    },
  },
  {
    id: 'SIEGE MODE',
    name: { en: 'SIEGE MODE', ko: 'SIEGE MODE' },
    definition: {
      en: 'While a Unit has the SIEGE MODE Status, apply the following rules:\n• This Unit cannot perform the Move, Disengage, Run, Charge or Close Ranks actions.\n• Weapons profile with Siege Mode Status can only be used while this unit has SIEGE MODE Status.\n• While this unit has Siege Mode Status any other weapons can\'t be used.\n• When this Unit is returned to Reserves, it loses the SIEGE MODE Status.',
      ko: '유닛이 공성모드 상태일 경우 다음 규칙을 적용한다. 이 유닛은 이동, 이탈, 질주, 차지 또는 진형유지를 할 수 없다. 공성모드 상태인 유닛의 무기 프로필은 공성모드일 때에만 사용할 수 있다. 공성모드 상태일 때 다른 무기를 사용할 수 없다. 유닛이 리저브로 되돌아갈 때 공성모드 상태를 잃는다.',
    },
  },
  {
    id: 'SPECIAL ABILITY',
    name: { en: 'SPECIAL ABILITY', ko: 'SPECIAL ABILITY' },
    definition: {
      en: 'A Special Ability is any named ability printed on a Unit Card, Tactical Card, or Faction Card. Every Special Ability falls into one of three categories: Active Ability, Passive Ability, or Reaction Ability (Part 2.7).\n• Active Abilities require the Unit to be Activated and are triggered immediately before or after an action. Each named Active Ability may be used once per Round per Unit unless it has the REPEATABLE keyword.\n• Passive Abilities are always in effect as long as the Unit is on the battlefield.\n• Reaction Abilities fire in response to a specific trigger. Each player may resolve only one Reaction per Activation, and each named Reaction Ability may be used only once per Round per Unit.\nAll three types are inactive while the Unit is in Reserves unless the ability explicitly states otherwise. A Unit cannot be affected by multiple instances of the same-named Special Ability simultaneously.',
      ko: '유닛, 택틱, 팩션 카드에 적힌 모든 이름 있는 능력을 뜻한다. 액티브, 패시브, 리액션 세 종류 중 하나에 속한다. 액티브 능력은 발동 전에 해당되는 유닛의 활성화를 요구하며 액션의 전이나 후에 발동된다. 이름이 있는 액티브 능력은 라운드당 한 번만 사용이 가능하다. 리액션 능력은 특수한 조건에 반응해서 발동한다. 한 활성화에 한 리액션만을 처리할 수 있으며, 이름이 있는 리액션 능력은 라운드당 한 번만 사용이 가능하다. 세 능력 모두 특별히 명시되지 않는 한 리저브 상태에서 발동되지 않는다. 유닛은 동일한 이름의 특수 능력의 영향을 동시에 받을 수 없다.',
    },
  },
  {
    id: 'SPECIALIST',
    name: { en: 'SPECIALIST', ko: 'SPECIALIST' },
    definition: {
      en: 'A Unit may include only one model equipped with this weapon. Multiple upgrades configuring more than one instance of this weapon are not permitted (Part 9.1.7).',
      ko: '유닛은 이 키워드를 지닌 무기를 장착한 모델을 단 하나만 유닛에 포함시킬 수 있다.',
    },
  },
  {
    id: 'SPILLOVER',
    name: { en: 'SPILLOVER', ko: 'SPILLOVER' },
    definition: {
      en: 'Additional hits generated by a Template Weapon that strike models outside the Primary target Unit. When a Blast Template (BT) or Flamer Template (FT) covers models belonging to Units other than the Primary target, those models are resolved as Spillover. Each affected Unit is resolved as a separate Batch. Spillover Batches do not apply Rate of Attack modifiers and do not generate Surge. Spillover may affect both Friendly and Enemy Units. See Part 8.7.6 for the full Template Weapon procedure.',
      ko: '템플릿 무기를 통해 공격할 때 주목적이 아닌 다른 유닛에 속한 모델이 그 피해를 받을 때 해당되는 공격은 파급으로 처리한다. 각 광역 피해는 서로 다른 공격 묶음으로 처리한다. 광역 피해로 인한 굴림은 RoA 수정치를 처리하지 않으며 서지를 발동시키지도 않는다. 광역 피해는 적과 아군 둘 다에게 영향을 끼친다.',
    },
  },
  {
    id: 'STATIONARY',
    name: { en: 'STATIONARY', ko: 'STATIONARY' },
    definition: {
      en: 'At the Start of the Round, all Units gain this Status. A Unit immediately loses this Status if any model in this Unit moves, is moved, or is PLACED for any reason.',
      ko: '라운드 시작 시 모든 유닛은 이 상태를 지닌다. 유닛의 어떤 모델이라도 움직이거나 이동당하거나 배치된다면 유닛은 이 상태를 잃는다.',
    },
  },
  {
    id: 'STATUS',
    name: { en: 'STATUS', ko: 'STATUS' },
    definition: {
      en: 'A category of keyword representing a temporary or persistent operational mode, condition, or statistic modifier affecting a Unit (e.g. BURROWED, SIEGE MODE). Unless stated otherwise, Statuses aren\'t removed during the Scoring and Cleanup Phase. They stay on the Unit until they are removed by other means.\nA Unit\'s active Status is visually tracked using Status Markers set next to the Unit:\n• Modes: Use Plastic Markers to track operational shifts (e.g. SIEGE MODE, BURROWED). Those Status Markers have STAY IN PLAY.\n• Other Statuses: Use Markers to track other effects affecting the Unit. Positive effects are tracked with Buff Markers (Blue), and negative effects are tracked with Debuff Markers (Red). Those Status Markers have STAY IN PLAY.',
      ko: '유닛의 상태를 나타낸다. 달리 명시되지 않는 한 득점 및 정리 페이즈 동안 제거되지 않는다. 제거를 위해선 특수한 처리가 필요하다. 유닛의 활성화 상태는 유닛 옆에 둔 마커를 통해 표현한다. 유닛의 특정한 모드는 플라스틱 마커를 통해 표현한다. 그 이외의 상태는 긍정적인 효과는 파랑, 부정적인 효과는 빨강으로 표현된다. 이러한 상태는 능력지속을 갖는다.',
    },
  },
  {
    id: 'STAY IN PLAY',
    name: { en: 'STAY IN PLAY', ko: 'STAY IN PLAY' },
    definition: {
      en: 'This Token, Marker or Ability Effect persists through Cleanup & Refresh (overrides Part 8.9.5). It remains until a specific condition removes it (e.g. destroyed or duration expires).',
      ko: '이 토큰, 마커, 상태는 정리 페이즈에도 제거되지 않는다. 이 상태의 제거에는 특수한 조건이 필요하다.',
    },
  },
  {
    id: 'SUMMON (Unit Name)',
    name: { en: 'SUMMON (Unit Name)', ko: 'SUMMON (Unit Name)' },
    definition: {
      en: "Set the Leading Model of the named Unit in Base-to-Base contact with the Parent Unit. Set remaining models In Coherency. Models cannot be set Within the Engagement Range of any Enemy Unit.\nSet an Activation Marker next to the summoned Unit - it cannot be Activated during the Phase in which it was summoned. In subsequent Phases, this Unit must be Activated immediately after its Parent Unit's activation ends, before the opponent's next activation.\nThe Summoned Unit cannot be set Within the opponent's Zone of Influence. The player must have sufficient Available Supply. If the Unit's Current Supply Value would cause Total Current Supply to exceed the Supply Pool, it cannot be Summoned.\nIf the Parent is not present on the battlefield, this Unit can be Activated normally.",
      ko: '명명된 유닛의 리딩 모델을 부모 유닛과 베이스 접촉하게 배치한다. 남은 모델을 코헤런시에 맞게 배치한다. 소환된 유닛은 활성화 마커를 두고 소환된 페이즈의 남은 기간 동안 활성화 될 수 없다. 이어지는 페이즈에서 부모 유닛의 활성화가 끝난 후 바로 소환된 유닛이 활성화되어야 한다. 소환된 유닛은 상대의 영향권에 놓일 수 없다. 플레이어는 충분한 가용 서플라이를 지녀야 하며, 가용 서플라이가 충분하지 않아서 소환이 불가능할 경우 소환될 수 없다. 부모 유닛이 존재하지 않게 된다면 소환된 유닛은 활성화 될 수 없다.',
    },
  },
  {
    id: 'SUPPLY VALUE',
    name: { en: 'SUPPLY VALUE', ko: 'SUPPLY VALUE' },
    definition: {
      en: "The Supply Value of a Unit is the value shown on the Unit Card's Supply Profile corresponding to the Unit's current model count. A Unit's starting Supply Value is determined during Army Building by the Composition Option selected (Part 9.1.6) and defines how many Army Slots the Unit occupies.\nSupply Value is a dynamic characteristic- as casualties reduce the model count into a lower bracket on the Supply Profile, the Supply Value decreases. Update immediately when a casualty moves the Unit into a lower bracket. Supply is used for Deployment, Mission Marker Control, Tactical Mass, and scoring.",
      ko: '유닛의 서플라이값이다. 아미 구성 옵션에 의해 결정되며 아미 슬롯을 차지하는 것을 정의한다. 서플라이값은 유닛의 잔여 모델로 인해 변동이 가능하다. 이 수치를 반영하는 것은 서플라이값이 전환될 정도로 수가 변했을 때 즉시 반영된다.',
    },
  },
  {
    id: 'SUPPORTING RANK',
    name: { en: 'SUPPORTING RANK', ko: 'SUPPORTING RANK' },
    definition: {
      en: 'A model is in the Supporting Rank if it is in Base-to-Base contact with a Friendly model from the same Unit that is in the Fighting Rank, but is not itself Within the Engagement Range of an Enemy model. Models in the Supporting Rank may strike with their Combat Phase weapons as though they were in the fight. See Part 8.8.1, Step 2.',
      ko: '근접전에서 전열이 정해진 후, 전열과 베이스 접촉되었지만 인게이지 거리 안에 있지는 않은 모델은 지원열에 있다고 표현한다. 지원열에 있는 모델은 자신이 인게이지 상태인 것처럼 근접전을 수행할 수 있다.',
    },
  },
  {
    id: 'SURGE',
    name: { en: 'SURGE', ko: 'SURGE' },
    definition: {
      en: "A weapon's Surge Die (rolled alongside the Attack Roll if the weapon has an S Dice characteristic) is resolved after the Roll to Hit. Check if the target Unit's Combat Tag matches the weapon's Surge Type: if not, the Surge Die result is discarded and no dice move. If it matches, move a number of dice equal to the Surge Die result from the Armour Pool directly to the Damage Pool, bypassing Armour entirely - Surge can never move more dice than are currently in the Armour Pool (Part 8.7.4).",
      ko: '무기의 Surge Die(무기에 S Dice 특성치가 있으면 Attack Roll과 함께 굴림)는 Roll to Hit 이후에 처리한다. 대상 유닛의 Combat Tag가 무기의 Surge Type과 일치하는지 확인한다: 일치하지 않으면 Surge Die 결과는 버려지며 어떤 주사위도 옮기지 않는다. 일치하면 Surge Die 결과만큼의 주사위를 Armour Pool에서 곧바로 Damage Pool로 옮기며, 이는 Armour를 완전히 건너뛴다 - Surge는 그 시점에 Armour Pool에 있는 주사위 수보다 더 많이 옮길 수 없다 (Part 8.7.4).',
    },
  },
  {
    id: 'TACTICAL MASS',
    name: { en: 'TACTICAL MASS', ko: 'TACTICAL MASS' },
    definition: {
      en: 'A Unit has Tactical Mass when its Current Supply Value exceeds the Combined Current Supply Value of all Enemy Units it is Engaged with. A Unit with Tactical Mass ignores the Disengage penalty (Part 8.5.4): it may Ranged Attack and Charge normally in the following Assault Phase after Disengaging.',
      ko: '유닛 자신의 서플라이값이 자신이 인게이지하고 있는 모든 적 유닛의 서플라이값을 초과한다면 전술적질량을 가진다. 전술적질량을 가진 유닛은 이탈 액션의 디메리트를 무시한다.',
    },
  },
  {
    id: 'TARGET POINT',
    name: { en: 'TARGET POINT', ko: 'TARGET POINT' },
    definition: {
      en: 'The reference point used to align a Template Weapon: the centre of the target model\'s base. For a Blast Template (BT), the template must cover as much of the target model\'s base as possible; for a Flamer Template (FT), the narrow end must be flush with the attacking model\'s base edge and aimed at the target. Templates affect only models on the same elevation level as the Target Point (Part 8.7.6).',
      ko: 'Template Weapon(템플릿 무기)의 정렬 기준점으로, 대상 모델 베이스의 중심을 가리킨다. Blast Template(BT)는 대상 모델의 베이스를 최대한 많이 덮도록 놓아야 하고, Flamer Template(FT)는 좁은 끝이 공격 모델의 베이스 가장자리에 맞닿은 채 대상을 겨냥해야 한다. 템플릿은 Target Point와 같은 고도에 있는 모델에게만 영향을 준다 (Part 8.7.6).',
    },
  },
  {
    id: 'TOUGH (X)',
    name: { en: 'TOUGH (X)', ko: 'TOUGH (X)' },
    definition: {
      en: 'When this Unit resolves an Armour Roll, change up to X failed results into successes. Treat them as meeting or exceeding the Armour characteristic - discard them without moving to the Damage Pool.',
      ko: '이 유닛이 아머 롤을 할 때 최대 X의 실패한 굴림을 성공으로 취급한다.',
    },
  },
  {
    id: 'UNENGAGED',
    name: { en: 'UNENGAGED', ko: 'UNENGAGED' },
    definition: {
      en: 'A Ground Unit is Unengaged when none of its models is Within 1" of any Enemy Ground model, or when terrain restrictions (Part 7.2.1) prevent valid Engagement despite proximity. Flying Units are always Unengaged.\nAn Unengaged Unit may perform a standard Move, Run, Ranged Attack, or Charge without restriction. Only Unengaged Units may be selected to perform a Move action (Part 8.5.2).',
      ko: '인게이지 상태가 아닌 지상 유닛이며 어떤 적 지상 모델도 1" 이내에 존재하지 않거나, 지형 제한으로 인해 인게이지가 성립되지 않는다면 인게이지 상태가 아닌 것으로 취급한다. 비행 유닛은 언제나 이 상태인 것으로 친다. 이러한 유닛은 아무런 제한 없이 일반적인 이동, 질주, 사격, 차지를 할 수 있다.',
    },
  },
  {
    id: 'VISIBLE',
    name: { en: 'VISIBLE', ko: 'VISIBLE' },
    definition: {
      en: 'A model is Visible to another model if a valid Line of Sight trace can be drawn between them (Part 7.1). If the trace does not pass through any Blocking Terrain, the target is Visible without further checks. If the trace passes through Blocking Terrain, apply the Cover rules (Part 7.1.1) - the target remains Visible unless Full Cover or Direct Cover blocks the Line of Sight.',
      ko: '유효한 시야선을 그릴 수 있다면 시야 내에 있다고 한다. 한 모델과 모델에 직선을 그어서 어떠한 시야 차단 지형도 그 직선을 가로막지 않는다면 다른 특이사항 없이 시야 내에 있다. 시야 차단 지형을 통과하더라도 완전 커버나 직접 커버가 시야를 완전히 차단하지 않는다면 시야 내에 있는 것으로 친다. 히든 상태의 모델은 4" 밖에선 항상 시야 내에 있지 않은 것으로 친다.',
    },
  },
  {
    id: 'WHOLLY WITHIN',
    name: { en: 'WHOLLY WITHIN', ko: 'WHOLLY WITHIN' },
    definition: {
      en: 'A model is Wholly Within a distance only if its entire base sits inside that range - no part of the base may extend beyond the edge. A Unit is Wholly Within a distance only if every model in the Unit satisfies this condition.\nWholly Within is a stricter requirement than Within and is used for Coherency checks (Part 4.4), certain ability areas of effect, and Mission Marker eligibility. When a rule specifies Wholly Within, partial overlap is not sufficient.',
      ko: '모델의 베이스 전체가 효과의 범위 안에 들어와 있을 때 완전히 안에 있는 것으로 친다. 유닛이 목표라면 그 유닛 전부가 효과의 범위 안에 있어야지 완전히 안에 있는 것으로 친다.',
    },
  },
  {
    id: 'WITHIN',
    name: { en: 'WITHIN', ko: 'WITHIN' },
    definition: {
      en: 'A model is Within a distance if any part of its base touches or crosses into that range. A Unit is Within a distance if at least one model in the Unit meets this condition.\nWithin is a less restrictive requirement than Wholly Within. When a rule specifies Within without the word "Wholly," partial overlap is sufficient.',
      ko: '모델의 베이스가 일부라도 효과의 범위 안에 들어와 있을 때 안에 있는 것으로 친다. 유닛이라면 유닛 내의 최소한 한 모델이라도 범위 안에 있다면 안에 있는 것으로 친다. 일반적으로 완전히 안에 있는 것이라고 표기되지 않는 한 이쪽으로 판정한다.',
    },
  },
  {
    id: 'ZONE OF INFLUENCE',
    name: { en: 'ZONE OF INFLUENCE', ko: 'ZONE OF INFLUENCE' },
    definition: {
      en: "A restricted area of the battlefield extending 6\" inward from a player's Entry Edge, as defined by the Deployment Card. Where the Entry Edge does not run the full length of a table edge, the Zone of Influence is marked using Zone of Influence Markers set at the corners of the Entry Edge.\nUnits arriving from Reserves cannot end their deployment Within the opponent's Zone of Influence. This restriction applies to all forms of arrival - whether by standard deployment, transport, or SUMMON (Part 8.3.3).\nThe Zone of Influence does not affect Units already on the battlefield. It does not restrict movement, block Line of Sight, or interact with any other rule once a Unit has completed its arrival.",
      ko: '배치 카드에 명시된, 플레이어의 엔트리 엣지로부터 전장 안쪽으로 6"까지 연장된 구간이 영향권이다. 엔트리 엣지가 가장자리 전체에 걸쳐져 있지 않다면 엣지의 모서리에 설정된 마커를 이용해 영향권을 표시한다.',
    },
  },
]
