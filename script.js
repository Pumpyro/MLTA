class Validator {
  constructor(word) {
    this.inputWord = word;
    this.index = 0;
  }

  match(char) {
    if (this.index < this.inputWord.length && this.inputWord[this.index] === char) {
      this.index++;
      return true;
    }
    return false;
  }

  P() {
    // if (this.match('*') && this.match('1')) {
    //   const p = this.P(); 
    //   return `*1${p}`;
    // }
    // if (this.match('/') && this.match('1')) {
    //   const p = this.P(); 
    //   return `/1${p}`;
    // }
    // return "";
    if (this.match('*') && this.match('1')) {
      return `*1${this.P()}`; // Рекурсивно продолжаем P
    }
    if (this.match('/') && this.match('1')) {
      return `/1${this.P()}`; // Рекурсивно продолжаем P
    }
    return ""; // e
  }
  

  A() {
    if (this.match('-') && this.match('1')) {
      const p1 = this.P();
      const a1 = this.A();
      if (this.match('+') && this.match('1')) {
        const p2 = this.P();
        const a2 = this.A();
        return `-1${p1}${a1}+1${p2}${a2}`;
      }
        return "";
    }
    return "";
  }

  B() {
    if (this.match('+') && this.match('1')) {
      const p1 = this.P();
      const b1 = this.B();
      if (this.match('-') && this.match('1')) {
        const p2 = this.P();
        const b2 = this.B();
        return `+1${p1}${b1}-1${p2}${b2}`;
      }
      return "";
    }
    return "";
  }

  K() {
    if (this.match('-') && this.match('1')) {
      const p1 = this.P();
      const a1 = this.A();
      if (this.match('+') && this.match('1')) {
        const p2 = this.P();
        const k1 = this.K();
        return `-1${p1}${a1}+1${p2}${k1}`;
      }
    } else if (this.match('+') && this.match('1')) {
      const p1 = this.P();
      const b1 = this.B();
      if (this.match('-') && this.match('1')) {
        const p2 = this.P();
        const k1 = this.K();
        return `+1${p1}${b1}-1${p2}${k1}`;
      }
    }
    return "";
  }

  S() {
    if (this.match('1')) {
      const p1 = this.P();
      const b1 = this.B();
      if (this.match('-') && this.match('1')) {
        const p2 = this.P();
        const k1 = this.K();
        return `1${p1}${b1}-1${p2}${k1}`;
      }
    }
    return null;
  }

  validate() {
    const constructedWord = this.S();
    return constructedWord === this.inputWord;
  }
}



document.getElementById("inputWord").addEventListener("input", () => {
  const inputWord = document.getElementById("inputWord").value.trim();
  const resultElement = document.getElementById("result");

  if (!inputWord) {
    resultElement.textContent = "Введите слово.";
    resultElement.className = "result invalid";
    return;
  }

  const validator = new Validator(inputWord);
  if (validator.validate()) {
    resultElement.textContent = "Слово валидное🤗";
    resultElement.classList.remove("invalid");
    resultElement.classList.add("valid");
  } else {
    resultElement.textContent = "Слово невалидное🥺";
    resultElement.classList.add("invalid");
    resultElement.classList.remove("valid");
  }
});
