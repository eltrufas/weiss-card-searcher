import io
import codecs
import re
import json


def split_cards(lines):
    card = []
    for line in lines:
        card.append(line)
        if ord(line[0]) == 61:
            yield card[1:-2]
            card = []

number_regex = re.compile('(\d+)+')
print(number_regex.findall('54 65'))


def parse_card(card):
    c = {}
    c['name'] = card[0].strip()
    c['weeb_name'] = card[1].strip()
    # c['trigger'] = card[6][10:].strip()
    # c['flavor'] = card[7][7:].strip()
    c['id'], _ = (x.strip() for x in
                            card[2][10:].split(' Rarity: '))
    c['color'], _ = (x.strip() for x in
                             card[3][7:].split(' Side: '))
    text = ''.join(str(x.replace('\n', ' ')) for x in card[8:])
    c['text'] = text[6:]

    m = number_regex.findall(card[4])
    c['level'], c['cost'], c['power'], c['soul'] = m

    return c


def get_cards(filename):
    f = open(filename, 'r', encoding='utf8')
    lines = f.readlines()[5:]
    return [parse_card(c) for c in split_cards(lines)]


'''lines = f.readlines()[5:]
print(lines)'''


files = [
    'bakemonogatari_booster_pack.txt',
    'monogatari_series_second_season_booster_pack.txt',
    'nisemonogatari_booster_pack.txt'
]

for file in files:
    out = open(file.split('.')[0] + '.json', 'w', encoding='utf8')
    out.write(json.dumps({'cards': get_cards(file)}))

'''cards = sum((get_cards(f) for f in files), [])

out = open('output.json', 'w', encoding='utf8')

out.write(json.dumps({'cards': cards}))'''

'''for key, val in c.items():
    print(key, val)'''
