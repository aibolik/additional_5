var stackFunc = (function () {
	var stack = [];
	var size = 0;

	function push(x) {
		stack[size++] = x;
	}

	function pop() {
		return stack[--size];
	}

	function front() {
		return stack[size - 1];
	}

	function getSize() {
		return size;
	}

	return {
		push,
		pop,
		front,
		getSize
	}
});

module.exports = function check(str, bracketsConfig) {
  var config = {}
  var stack = stackFunc();
  for (var item of bracketsConfig) {
	config[item[0]] = {
		value: item[1],
		same: item[0] === item[1]
	};
  }

  for (var i = 0; i < str.length; i++) {
  	if (config.hasOwnProperty(str[i])) {
  		if (!config[str[i]].same) {
  			stack.push(str[i]);
  		} else {
  			if (config[stack.front()] && str[i] === config[stack.front()].value) {
  				stack.pop();
  			} else {
  				stack.push(str[i]);
  			}
  		}
  	} else if(config[stack.front()] && str[i] === config[stack.front()].value){
  		stack.pop();
  	} else {
  		return false;
  	}
  }
  if (stack.getSize() > 0) return false;

  return true;
}
