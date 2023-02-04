const a = [a => 1, b => 2, c => 3];

function spread(...param) {
  console.log(param);
}

spread(a);