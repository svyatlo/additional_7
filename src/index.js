module.exports = function solveSudoku(matrix) {
  // your solution
  const initialSet = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let arr = [],
      arr1 = [],
      arr2 = [],
      arr3 = [];
  let lengthesOfTempMatrix = [];
  let isNotSolved = true;
  let canNotBeSolvedEasy = true;

  function CreateMatrix(length) {
    let arr = [];
    for (let i = 0; i < length; i++) {
      arr[i] = [0];
      for (let j = 0; j < length; j++){
        arr[i][j] = 0;
      }
    }
    return arr;
  }

  function isSolved(arr) {
    return arr.map(element => element.includes(0)).some(element => element == true);
  }

  function moreThanTwoNumbers(arr){
    return !arr.every(element => element >= 2);
  }
  
  while (canNotBeSolvedEasy) {
    // работа со строками
    let temporaryMatrixRow = CreateMatrix(9);
    for (let i = 0; i < 9; i++) {
      let row = initialSet.slice();
      if (matrix[i].includes(0) == false) continue;
      for (let j = 0; j < 9; j++) {
        if (row.includes(matrix[i][j])) {
          row.splice(row.indexOf(matrix[i][j]), 1); // [ возвращает массив элементов,
        }                                                                  // которых нет в строке ]
      }

      for (let j = 0; j < 9; j++) {
        if (matrix[i][j] == 0) {
          temporaryMatrixRow[i][j] = row; // массивы отсутствующих в строках элементов помещаю во временную матрицу строк
        }
      }
    }

    // работа со столбцами
    let temporaryMatrixColumn = CreateMatrix(9);
    for (let j = 0; j < 9; j++) {
      let column = initialSet.slice();
      for (let i = 0; i < 9; i++) {
        if (column.includes(matrix[i][j])) {
          column.splice(column.indexOf(matrix[i][j]), 1); // [ возвращает массив элементов,
        }                                                 // которых нет в столбце ]
      }

      for (let i = 0; i < 9; i++) {
        if (matrix[i][j] == 0) {
          temporaryMatrixColumn[i][j] = column; // массивы отсутствующих в столбцах элементов помещаю во временную матрицу столбцов
        }
      }
    }

    // работа с квадратами
    let temporaryMatrixSquare = CreateMatrix(9);
    for (let k = 0; k < 9; k += 3) {
      for (let x = 0; x < 9; x += 3) {
        let square = initialSet.slice();
        for (let i = k; i < k + 3; i++) {
          for (let j = x; j < x + 3; j++) {
            if (square.includes(matrix[i][j])) {
              square.splice(square.indexOf(matrix[i][j]), 1); // [ возвращает массив элементов,
            }                                                 // которых нет в квадрате ]
          }
        }
           
        for (let i = k; i < k + 3; i++) {
          for (let j = x; j < x + 3; j++) {
            if (matrix[i][j] == 0) {
              temporaryMatrixSquare[i][j] = square; // массивы отсутствующих в квадратах элементов помещаю во временную матрицу столбцов
            }
          }
        }
      }  
    }

    //сравнение элементов временных матриц
    lengthesOfTempMatrix = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        arr = [];
        if (temporaryMatrixRow[i][j] == 0 && temporaryMatrixColumn[i][j] == 0 && temporaryMatrixSquare[i][j] == 0) continue;
        arr1 = temporaryMatrixRow[i][j];
        arr2 = temporaryMatrixColumn[i][j];
        arr3 = temporaryMatrixSquare[i][j];
        for (let k = 1; k <= 9; k++) {
          if (arr1.includes(k) && arr2.includes(k)  && arr3.includes(k)) {
            arr.push(k);
          }
        }
        if (arr.length == 1) {
          matrix[i][j] = arr[0];
        } 
        
        lengthesOfTempMatrix.push(arr.length);
      }
    }

    isNotSolved = isSolved(matrix);
    canNotBeSolvedEasy = moreThanTwoNumbers(lengthesOfTempMatrix);
  }
  return matrix;
}
