/**
 * Original radical reference data.
 *
 * These are the standard building blocks used by the kanji in `content.ts`.
 * Names, meanings and memory hints are written for this app and are not taken
 * from any commercial course.
 */

export interface Radical {
  id: string;
  char: string;
  name: string;
  meaning: string;
  hint: string;
  mnemonic: string;
}

export const radicals: Radical[] = [
  { id: 'r-nichi', char: '日', name: 'Sun', meaning: 'sun / day', hint: 'A box with a line through it', mnemonic: 'Picture a square window with a bright line in the middle: the sun, and one day.' },
  { id: 'r-ki', char: '木', name: 'Tree', meaning: 'tree / wood', hint: 'Trunk, branches, roots', mnemonic: 'A vertical trunk, two arms reaching out, and two roots below: a tree.' },
  { id: 'r-hito', char: '人', name: 'Person', meaning: 'person', hint: 'Two legs walking', mnemonic: 'Two strokes lean together like someone striding forward: a person.' },
  { id: 'r-dai', char: '大', name: 'Big', meaning: 'big / large', hint: 'A person with open arms', mnemonic: 'A person stretching both arms wide to show how big something is.' },
  { id: 'r-sho', char: '小', name: 'Small', meaning: 'small', hint: 'Three little marks', mnemonic: 'Three tiny dashes, each smaller than the last: small.' },
  { id: 'r-yama', char: '山', name: 'Mountain', meaning: 'mountain', hint: 'Three peaks', mnemonic: 'Three rising peaks with a valley between them: a mountain range.' },
  { id: 'r-kawa', char: '川', name: 'River', meaning: 'river', hint: 'Three flowing streams', mnemonic: 'Three vertical strokes flowing downward like currents in a river.' },
  { id: 'r-mizu', char: '水', name: 'Water', meaning: 'water', hint: 'A stream with droplets', mnemonic: 'A central flow with little splashes on either side: water.' },
  { id: 'r-hi', char: '火', name: 'Fire', meaning: 'fire', hint: 'Two rising flames', mnemonic: 'Two sparks leaning upward, as if a flame is licking the air.' },
  { id: 'r-kin', char: '金', name: 'Gold', meaning: 'gold / metal', hint: 'A roof over a nugget', mnemonic: 'A shelter above a shining nugget with two glints: gold.' },
  { id: 'r-tsuchi', char: '土', name: 'Ground', meaning: 'soil / earth', hint: 'A mound on a baseline', mnemonic: 'A little heap sitting on the ground line: soil.' },
  { id: 'r-tsuki', char: '月', name: 'Moon', meaning: 'moon / month', hint: 'A slender crescent', mnemonic: 'A thin curved shape like a crescent moon: month.' },
  { id: 'r-ko', char: '子', name: 'Child', meaning: 'child', hint: 'Big head, small body', mnemonic: 'A rounded head, a little body, and one arm out: a child.' },
  { id: 'r-ji', char: '儿', name: 'Legs', meaning: 'legs / walking', hint: 'Two spread feet', mnemonic: 'Two separate strokes like feet mid-step: legs.' },
  { id: 'r-mon', char: '門', name: 'Gate', meaning: 'gate / doorway', hint: 'Two swinging doors', mnemonic: 'A pair of tall panels hinged at the top: a gate.' },
  { id: 'r-gen', char: '言', name: 'Speech', meaning: 'words / say', hint: 'A mouth with a top line', mnemonic: 'A mouth beneath a short stroke, like words rising from speech: say.' },
  { id: 'r-shoku', char: '食', name: 'Eat', meaning: 'eat / food', hint: 'A good thing on a plate', mnemonic: 'A rooftop over a bowl and a spoon: food.' },
  { id: 'r-gyo', char: '行', name: 'Go', meaning: 'go / movement', hint: 'A crossing road', mnemonic: 'A fork in a path with steps on each side: go.' },
  { id: 'r-ken', char: '見', name: 'See', meaning: 'see / look', hint: 'An eye on legs', mnemonic: 'A large eye sitting on two feet: see.' },
  { id: 'r-mimi', char: '耳', name: 'Ear', meaning: 'ear / hear', hint: 'A side profile of an ear', mnemonic: 'A box with inner lines like the folds of an ear: hear.' },
  { id: 'r-ame', char: '雨', name: 'Rain', meaning: 'rain', hint: 'A cloud with drops', mnemonic: 'A roof-like cloud with four droplets falling inside: rain.' },
  { id: 'r-sha', char: '車', name: 'Car', meaning: 'car / vehicle', hint: 'A cart from above', mnemonic: 'A rectangle with a central axle and wheels: a vehicle.' },
  { id: 'r-ne', char: '禾', name: 'Grain', meaning: 'grain / rice plant', hint: 'A stalk with a heavy head', mnemonic: 'A tree with a sloping top, bowed under ripe grain: rice plant.' },
  { id: 'r-onna', char: '女', name: 'Woman', meaning: 'woman', hint: 'A seated figure', mnemonic: 'A figure sitting with crossed legs and arms: woman.' },
  { id: 'r-ta', char: '田', name: 'Field', meaning: 'rice field', hint: 'A divided square', mnemonic: 'A square plot split into four by paths: a field.' },
  { id: 'r-mata', char: '又', name: 'Again', meaning: 'again / hand', hint: 'Two crossing strokes', mnemonic: 'A hand reaching back and crossing over: again.' },
  { id: 'r-kuni', char: '囗', name: 'Enclosure', meaning: 'box / boundary', hint: 'A complete border', mnemonic: 'A full frame around an empty space: a boundary.' },
  { id: 'r-yue', char: '曰', name: 'Say', meaning: 'say / box', hint: 'A small open box', mnemonic: 'A little box with a line across it, like a speech slot: say.' },
  { id: 'r-sei', char: '生', name: 'Life', meaning: 'life / birth', hint: 'A sprout from the ground', mnemonic: 'A shoot pushing up out of the soil: life.' },
];

export const radicalById = new Map(radicals.map((radical) => [radical.id, radical]));
export const radicalByChar = new Map(radicals.map((radical) => [radical.char, radical]));
