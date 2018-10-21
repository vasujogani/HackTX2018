from bs4 import BeautifulSoup
import re
import requests

def findPrice(product):
    product_str = '%20'.join(product.split(' '))
    response = requests.get('https://www.walmart.com/search/?query=' + product_str)

    soup = BeautifulSoup(response.content, 'html.parser')
    grps = soup.find_all('span', {'class': 'price-group'})

    groups_str = ''
    for g in grps:
        groups_str += str(g)
    m = re.findall("([$]\d+.\d+)", str(groups_str))

    rm = ['0.00', '$1.00', '$1.0', '$0.00', '$1.1']
    for v in rm:
        m = list(filter(lambda a: a != v, m))

    res = []
    for v in m:
            v = v[1:]
            try:
                res.append(float(v))
            except:
                continue
    res.sort()
<<<<<<< HEAD
    res = res[int(len(res)*.03): int(len(res)*.24)]
=======
    res = res[int(len(res)*.01): int(len(res)*.12)]
>>>>>>> 02e3dd094b24fbdee0fbbb03d923b65e0fec81d4

    if res:
        if sum(res)/len(res)> 20:
            return sum(res)/len(res)%10    
        return sum(res)/len(res)
    return 0
