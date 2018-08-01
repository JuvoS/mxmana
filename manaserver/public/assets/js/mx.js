var mnListObj = {
	url: '',
	type: 'get',
	getAllList: function(url, type, func)
	{
		this.url = url;
		this.type = type;
		$.ajax({
			type: this.type,
			url: this.url,
			async: true,
			success: function(data){
				return func(data);
			},
			error: function(err){
				alert(err);
			}
		});
	}
};
var mnPostObj = {
	url: '',
	type: 'post',
	create: function(url, data, func)
	{
		this.url = url;
		$.ajax({
			type: this.type,
			url: this.url,
			data: data,
			async: true,
			success: function(data){
				return func(data);
			},
			error: function(err){
				alert(err);
			}
		});
	}
};