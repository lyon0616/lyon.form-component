$(function(){
	$.ajax({
		url:"data.json",
		type:"get",
		async:false,
		dataType:"json",
		success:function(result){
//			console.log(result.data.length,"dldldl");
			for(var n=0;n<result.data.length;n++){
				var dataele = result.data[n];
//				console.log(result.data[n].pwrapidname,"888");
//				创建表单
				createForm(result.data[n].pwrapidname,n,dataele);
//				美化下拉框
				fileInput(dataele);
				//添加验证
				validateFunc(dataele);
			}
		}
	})
})
function createForm(pwrapid,tempid,ele){
	$(pwrapid).append("<div id='app"+tempid+"'><diy-component> </diy-component></div>")
	if($('#myComponent').length==0){
		$('body').append("<template class='hidden' id='myComponent'><form ref='container' class='form-horizontal'></form></template>")
	}

	    new Vue({
	        el: '#app'+tempid,
	        components: {
	            'diy-component': {
	                template: '#myComponent',
	                    mounted: function() {
	                        // 需要创建label标签的元素的数组
	                       const needLabelElements = ['input', 'textarea', 'radio', 'checkbox', 'date', 'number', 'select'];

	                       		// 遍历数据，创建标签
	                            ele.elements.map(function(obj) {
	                                // 创建表单元素的容器section
	                                let section = document.createElement('section')
	                                section.setAttribute("class","form-group")
	                                let divs = document.createElement('div')
	                                divs.setAttribute("class","col-sm-10")

	                                // 判断当前是什么元素
	                                switch (obj.elementType) {
	                                    case 'input':
	                                        { // 创建label 创建input
	                                            // 创建label
	                                            let label = document.createElement('label')
	                                            label.innerHTML = obj.labelname
	                                            label.htmlFor = obj.id
	                                            label.className = obj.labelClass
	                                            section.appendChild(label)
	                                            section.appendChild(divs)
	                                            
	                                            // 根据表单类型做处理
	                                            if (obj.type === 'radio' || obj.type === 'checkbox') { // radio checkbox
	                                                obj.value.map(function(item) {
	                                                    // 创建radio或者checkbox
	                                                    let input = document.createElement('input')
	                                                    input.name = obj.id // radio和checkbox是分组的，同组下name必须一致
	                                                    input.name = obj.names
	                                                    input.value = item // radio和checkbox自己的值
	                                                    input.type = obj.type // input表单元素的类型
	                                                    input.id = item // 为了配合上面的label使用
	                                                    divs.appendChild(input) // 拼接到section中 

	                                                    // 创建radio或者checkbox对应的label
	                                                    let itemLabel = document.createElement('label')
	                                                    itemLabel.innerHTML = item // 设置label内容
	                                                    itemLabel.htmlFor = item
	                                                    divs.appendChild(itemLabel) // 拼接到section中
	                                                })
	                                            }else{ // text password file
	                                                let input = document.createElement('input')
	                                                input.type = obj.type
	                                                input.name = obj.names
	                                                input.className = obj.class
	                                                input.id = obj.id
	                                                divs.appendChild(input)
	                                            	
	                                            }

	                                            break;
	                                        }
	                                    case 'button':
	                                        { // 直接创建button

	                                            let btn = document.createElement('button')
	                                            btn.innerHTML = obj.name
	                                            btn.id = obj.id
	                                            btn.name = btn.names
	                                            section.appendChild(btn)

	                                            break;
	                                        }
	                                    case 'textarea':
	                                        { // 创建label 创建textarea
	                                            let label = document.createElement('label')
	                                            label.innerHTML = obj.labelname
	                                            label.htmlFor = obj.id
	                                            label.className = obj.labelClass
	                                            section.appendChild(label)
	                                            section.appendChild(divs)
	                                          
	                                            let textarea = document.createElement('textarea')
	                                            textarea.id = obj.id
	                                            textarea.name = obj.names
	                                            textarea.className = obj.names
	                                            textarea.type = obj.type
	                                            divs.appendChild(textarea)

	                                            break;
	                                        }
	                                    case 'select':
	                                        {
	                                            let select = document.createElement('select')
	                                            select.id = obj.id
	                                            select.name = obj.names
	                                            obj.value.map(function(item) {
	                                            let option = document.createElement('option')
	                                            option.id = item
	                                            option.innerHTML = item
	                                            divs.appendChild(select)
	                                            select.appendChild(option)
	                                        })
	                                            break;
	                                        }
	                                    default:
	                                        {
	                                            console.log('other');
	                                        }
	                                }

	                                // 存储到数组中
	                                this.$refs.container.appendChild(section)
	                            }.bind(this));
	                    }
	            }
	        }
	    });
}    

			function fileInput(formsData){
				var inputId = {};
				var inputType = {};
				for(var i = 0;i<formsData.elements.length;i++){
//			         fileinput美化文件上传
					inputType = formsData.elements[i].type;
					inputId = formsData.elements[i].id;
					if(inputType=="file"){
						var iFileExt=['jpg', 'png','gif','bmp'];
						$("#"+inputId).fileinput({
							'language':'zh',
							'showUpload':false,
							'maxFileSize': 2000,
							'maxFileCount': 1,
							'allowedFileExtensions' : iFileExt,
							'previewFileType':'any'
						});
					}else if(inputType=="select"){//美化下拉框
						initselect2.init_select2("#"+inputId);
					}else if(inputType=="date"){// 初始化时间
						 $("#"+inputId).attr("type","text");
						 $("#"+inputId).datetimepicker({
	                            format: 'L',
	                            locale: 'zh-cn',
	                            ignoreReadonly: true
	                        });
					}
				}
			}
		
			
			
//验证
		function validateFunc(forms){
			var myValidate = {};
			var myLanguage = {};
			var custom = {};
			var promptTishi = {};
	          		for(var index = 0;index < forms.elements.length; index++){
	          			myValidate[forms.elements[index].names] = forms.elements[index].myrules;
	          			myLanguage[forms.elements[index].names] = forms.elements[index].messagesinfo;
	          			custom = forms.elements[index].customrules;//自定义规则
	          			promptTishi = forms.elements[index].promptText;//提示文字
	          			var warningTitle="";
	          			
	          			for(var key in promptTishi){
	          				warningTitle=promptTishi[key];
	          			}
	          			for(var key in custom){
//        		  			var myfunction = eval("(" + custom[key] + ")");
	          				jQuery.validator.addMethod(key, eval("(" + custom[key] + ")"), "<font color='red'>"+warningTitle+"</font>");
	          			}
	          		}
	          		
	var validate = $(".form-horizontal").validate({
        debug: true,   
        focusInvalid: false, //当为false时，验证无效时，没有焦点响应  
        onkeyup: false,   
        submitHandler: function(form){     
            alert("提交表单");  
            form.submit();
        }, 
       
        rules:myValidate,
        messages:myLanguage
    });
}
		




////		    验证自定义
////			邮箱
//			jQuery.validator.addMethod("validateEmail", function(value, element) {   
//			    var emails = /^\w+@\w+(\.(com|cn|net|org|edu)){1,2}$/g;
//			    return this.optional(element) || (emails.test(value));
//			}, "<font color='red'>请正确填写邮箱账号</font>");
////			手机号
//			jQuery.validator.addMethod("validatePhone", function(value, element) {   
//			    var tel = /^(13|14|15|17|18)[0-9]{9}$/;
//			    return this.optional(element) || (tel.test(value));
//			}, "<font color='red'>请正确填写您的手机号</font>");
////			网址
//			jQuery.validator.addMethod("validateWeb", function(value, element) {
//			 	var web = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
//			 	return this.optional(element) || (web.test(value));
//			},"<font color='red'>请正确填写您的网址</font>");
////	    	汉字
//	    	jQuery.validator.addMethod("chcharacter", function(value, element) {
//	    		var chinese = /^[u4e00-u9fa5]+$/;
//	    		return this.optional(element) || (chinese.test(value));
//	    	}, "<font color='red'>请输入汉字</font>");
//	    	
////	    	只能是数字
//	    	jQuery.validator.addMethod("num", function(value, element) {
//	    		var isNumber = /^[Z0-9]+$/;
//	    		return this.optional(element) || (isNumber.test(value));
//	    	}, "<font color='red'>请输入数字</font>");
//	   });
//
   	