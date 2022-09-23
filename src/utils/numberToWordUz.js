export function numberToWordUz(n) {
    if (!n) return n
    var string = n.toString().replaceAll(' ', '')
    var units; var tens; var scales; var start; var end; var chunks; var chunksLen; var chunk; var ints; var i; var word; var words
    if (parseInt(string) === 0) {
      return 'Нол'
    }
    units = ['', 'бир', 'икки', 'уч', 'тўрт', 'беш', 'олти', 'етти', 'саккиз', 'тўққиз', 'ўн', 'ўн бир', 'ўн икки', 'ўн уч', 'ўн тўрт', 'ўн беш', 'ўн олти', 'ўн етти', 'ўн саккиз', 'ўн тўққиз']
    tens = ['', '', 'йигирма', 'ўттиз', 'қирқ', 'эллик', 'олтмиш', 'етмиш', 'саксон', 'тўқсон']
    scales = ['', 'минг', 'миллион', 'миллиард', 'триллион', 'квадрилон']
    start = string.length
    chunks = []
    while (start > 0) {
      end = start
      chunks.push(string.slice((start = Math.max(0, start - 3)), end))
    }
    chunksLen = chunks.length
    if (chunksLen > scales.length) {
      return ''
    }
    words = []
    for (i = 0; i < chunksLen; i++) {
      chunk = parseInt(chunks[i])
      if (chunk) {
        ints = chunks[i].split('').reverse().map(parseFloat)
        if (ints[1] === 1) {
          ints[0] += 10
        }
        /* Add scale word if chunk is not zero and array item exists */
        if ((word = scales[i])) {
          words.push(word)
        }
        /* Add unit word if array item exists */
        if ((word = units[ints[0]])) {
          words.push(word)
        }
        /* Add tens word if array item exists */
        if ((word = tens[ints[1]])) {
          words.push(word)
        }
        if ((word = units[ints[2]])) {
          words.push(word + ' юз')
        }
      }
    }
    return words.reverse().join(' ')
  }
  