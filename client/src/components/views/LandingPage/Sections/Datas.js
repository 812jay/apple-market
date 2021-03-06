const sort = [
    {'_id': 1, 'name': '디지털/가전'}, 
    {'_id': 2, 'name': '가구/인테리어'}, 
    {'_id': 3, 'name': '유아동/유아도서'}, 
    {'_id': 4, 'name': '생활/가공식품'}, 
    {'_id': 5, 'name': '스포츠/레저'}, 
    {'_id': 6, 'name': '여성패션/잡화'}, 
    {'_id': 7, 'name': '남성패션/잡화'},
    {'_id': 8, 'name': '게임/취미'},
    {'_id': 9, 'name': '뷰티/미용'},
    {'_id': 10, 'name': '반려동물용품'},
    {'_id': 11, 'name': '도서/티켓/음반'},
    {'_id': 12, 'name': '식물'},
    {'_id': 13, 'name': '기타'},
    {'_id': 14, 'name': '삽니다'}
];

const price = [
    {'_id': 0, 'name': '전체금액', 'array': []},
    {'_id': 1, 'name': '~50000', 'array': [0, 49999]},
    {'_id': 2, 'name': '50000~100000', 'array': [50000, 99999]},
    {'_id': 3, 'name': '100000~150000', 'array': [100000, 149999]},
    {'_id': 4, 'name': '150000~200000', 'array': [150000, 199999]},
    {'_id': 5, 'name': '200000~', 'array': [200000, 9999999999]},
]

export { sort, price }