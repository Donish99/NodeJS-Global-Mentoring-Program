process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    var reversed = chunk.split('').reverse().join('');
    process.stdout.write(reversed);
  }
});

process.stdin.on('end', function() {
  process.stdout.write('end of input');
});