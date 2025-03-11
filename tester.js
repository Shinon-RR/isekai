// import readlineSync from 'readline-sync';
// const start = Date.now();
// console.log(start)
// let canMerge = ["과자","음료수","라면면"]

// let cardNameIndex = readlineSync.keyInSelect(canMerge,'choice ',{ cancel: '뒤로가기' },) + 1;  
// console.log(cardNameIndex)

const readline = require('readline');  // readline 모듈 불러오기

const rl = readline.createInterface({  // 인터페이스 생성
    input: process.stdin,  // 표준 입력으로 입력받기
    output: process.stdout  // 표준 출력으로 출력하기
});

rl.on('line', (line) => {  // rl.on('line', (line))으로 한 줄씩 입력을 받아 line 변수에 저장
    console.log(line);  // 입력 값 출력
    rl.close();  // 종료
})

rl.on('close', (close) => {  // 종료 시 실행
    console.log('Goodbye!');
    process.exit(0);
})