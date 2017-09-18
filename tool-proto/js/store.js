const abcdefgstore = {};

const storeHandler = {
	store: function(key, value, force=false){
		if (!abcdefgstore.hasOwnProperty(key)){
			abcdefgstore[key] = value;
			return true;
		}
		else if (abcdefgstore.hasOwnProperty(key) && force){
			abcdefgstore[key] = value;
			return true;
		}
		else {
			console.error("Store already has that key. Use force=true to overwrite.");
		}
		return false
	},

	retrieve: function(key){
		return abcdefgstore[key];
	},

	hasKey: function(key){
		return (abcdefgstore.hasOwnProperty(key))? true : false
	},

	getStore: function(){
		return Object.assign(abcdefgstore)
	},

	clear: function(){
		abcdefgstore = {};
	}
}