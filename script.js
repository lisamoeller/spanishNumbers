const numberObj = {
  0: 'cero',
  1: 'uno',
  2: 'dos',
  3: 'tres',
  4: 'cuatro',
  5: 'cinco',
  6: 'seis',
  7: 'siete',
  8: 'ocho',
  9: 'nueve',
  10: ['diez', 'dieci'],
  11: 'once',
  12: 'doce',
  13: 'trece',
  14: 'catorce',
  15: 'quince',
  20: ['veinte', 'veinti'],
  30: 'treinta',
  40: 'cuarenta',
  50: 'cincuenta',
  60: 'sesenta',
  70: 'setenta',
  80: 'ochenta',
  90: 'noventa',
  100: ['cien', 'ciento', 'cientos'],
  500: 'quinientos',
  700: 'setecientos',
  900: 'novecientos',
  1000: 'mil',
  1000000: ['millión', 'millones']
};
const input = document.querySelector("input");
const output = document.querySelector("#number");

function getDezi(t, o){
  const num = t * 10 + o;

  if(t == 0 && o != 0) return numberObj[o];
  
  if(num < 30){
    if(num%10 == 0){
      return numberObj[num][0];
    }else if(numberObj[num]){
      return numberObj[num];
    }
    
    return numberObj[t * 10][1] + numberObj[o];
  }
  
  if(o !== 0){
    return numberObj[t * 10] + " y " + numberObj[o];
  }else{
    return numberObj[t * 10];
  }
}

function getHundrets(h, t, o){
  let hString = '';
  let deziString = '';

  if(h === 1){
    const isZero = t == 0 && o == 0;
    hString = isZero ? numberObj[100][0] : numberObj[100][1];
  }else if(h >= 2){
    hString = numberObj[h * 100] || numberObj[h] + numberObj[100][2]
  }
  
  if(t || o){
    hString = hString + " "
    deziString = getDezi(t, o);
  }
  return hString + deziString;
}

function numberToString(num){
  let numString = num.toString().split('');
  let numArray = []
  
  if(numString.length % 3 == 1){
    numString = ["0", "0", ...numString];
  }
  if(numString.length % 3 == 2){
    numString = ["0", ...numString];
  }
  
  for(let i = 0; i <= Math.ceil((numString.length)/3) - 1; i++){
    numArray[i] = [];
    for(let j = 0; j < 3; j++){
      if(numString[3*i + j]){
        numArray[i][j] = parseInt(numString[3*i + j]);
      }
    }
  }
  
  const mappedNumArray = numArray.map(arr => getHundrets(...arr));
  return mappedNumArray;
}

function write(){
  if(input.value == '') return '';
  let string = '';
  
  if(numberObj[input.value] && !Array.isArray(numberObj[input.value])){
    string = numberObj[input.value];
  }else{
    const stringArray =  numberToString(input.value);
    stringArray.reverse();
    string = stringArray[0];
    
    if(stringArray.length > 1){
      string = stringArray[1] != '' ? stringArray[1] + ' mil ' + string : '';
    
      if(stringArray.length > 2){
        string = stringArray[2] + ' millones ' + string;
      }
    }
  }
  
  return string.includes('undefined') ? '' : string;
}

input.addEventListener('keyup', () => {output.innerHTML = write()});