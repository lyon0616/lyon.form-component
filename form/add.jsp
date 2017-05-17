<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/common/head.jsp"%>

	
        <form class="col-sm-12 form-horizontal" id="createform" style="overflow:scroll;height:450px;">
        	<div class="form-group" id="box0">
    			<label for="" class="col-sm-1 control-label" >labelname</label>
    			<div class="col-sm-1">
      				<input type="text" class="form-control labelText" name="labelText">
    			</div>

    			<label for="" class="col-sm-1 control-label">id</label>
    			<div class="col-sm-1">
      				<input type="text" class="form-control necessaryId" name="necessaryId">
    			</div>

    			<label for="" class="col-sm-1 control-label">class</label>
    			<div class="col-sm-1">
      				<input type="text" class="form-control necessaryClass" name="necessaryClass">
    			</div>

    			<label for="" class="col-sm-1 control-label">name</label>
    			<div class="col-sm-1">
      				<input type="text" class="form-control nameText" name="nameText">
    			</div>

            	<label for="" class="col-sm-1 control-label">elementType</label>
    			<div class="col-sm-1">
      				<input type="text" class="form-control elementTypeText" name="elementTypeText">
    			</div>

            	<label for="" class="col-sm-1 control-label">type</label>
            	<div class="col-sm-1">
            		<select class="form-control" name="selectVal">
            			<option>text</option>
            			<option>number</option>
            			<option>radio</option>
            			<option>date</option>
            			<option>file</option>
            			<option>checkbox</option>
            			<option>textarea</option>
            			<option>select</option>
            		</select>
            	</div>
            </div>
            <div class="form-group" id="btn0">
            <button type="button" class="btn btn-warning" name="rules" >更多</button>
            </div>
        </form>
        <div class="col-sm-12" style="position:absolute;left:80%;">
        	<button type="button" class="btn btn-success" id="addBtn">添加列表项</button>
        </div>
        <button type="button" class="btn btn-primary" style="position: absolute;bottom: 60px;text-align: center;left: 50%;margin-left: -32px;text-align: center;" id="submit">保存表单</button>
   
    <%@include file="/common/footer.jsp"%>
    <script src="vue.min.js" charset="utf-8"></script>
    <script src="form.js" charset="utf-8"></script>
    <script type="text/javascript">
    //更多详情
    function rulesDetail(divId){
    	$(divId).append("<label for='' class='col-sm-1 control-label'>验证</label><div class='col-sm-3' id='rolesBox"+count+"'><select><option value='required'>必填</option><option value='email'>邮件</option><option value='date'>日期</option><option value='url'>网址</option><option value='digits'>必须输入整数</option><option value='number'>必须输入合法的数字（负数，小数）</option><option value='customrules'>自定义</option></select><input type='text' class='form-control' name='mycusName' placeholder='请输入自定义验证方法名'><input type='text' class='form-control' name='myRole' placeholder='请输入自定义规则'><input type='text' class='form-control' name='myMsg' placeholder='请输入自定义显示文字'></div>");
    }
    //初始化更多按钮
    function initRules(divId){
		$("#"+divId+" button[name=rules]").click(function(){
			console.log(this,"this");
			//previousElementSibling上一个兄弟元素节点
			var parentId=this.parentNode.previousElementSibling.id;
			console.log(parentId);
			rulesDetail("#"+parentId);
		})
	}
    	var count = 0;
    	$(function(){
       		initRules("btn0");
            $("#addBtn").on("click",function(){
            	count++;
            	$("#createform").append("<div class='form-group' id='box"+count+"'><label for='' class='col-sm-1 control-label'>labelname</label><div class='col-sm-1'><input type='text' class='form-control labelText' name='labelText'></div><label for='' class='col-sm-1 control-label'>id</label><div class='col-sm-1'><input type='text' class='form-control necessaryId' name='necessaryId'></div><label for='' class='col-sm-1 control-label'>class</label><div class='col-sm-1'><input type='text' class='form-control necessaryClass' name='necessaryClass'></div><label for='' class='col-sm-1 control-label'>name</label><div class='col-sm-1'><input type='text' class='form-control nameText' name='nameText'></div><label for='' class='col-sm-1 control-label'>elementType</label><div class='col-sm-1'><input type='text' class='form-control elementTypeText' name='elementTypeText'></div><label for='' class='col-sm-1 control-label'>type</label><div class='col-sm-1'><select class='form-control' name='selectVal'><option>text</option><option>number</option><option>radio</option><option>date</option><option>file</option><option>checkbox</option><option>textarea</option><option>select</option></select></div></div><div class='form-group' id='btn"+count+"'><button type='button' class='btn btn-warning' name='rules' >更多</button></div>");
            	//设备规则按钮事件
				initRules("btn"+count);
           	});	
		});
		$("#submit").on("click",function(){
            if($(".necessaryId").val() != $(".necessaryClass").val()){
				alert("id需要和class保持一致");
			}
			var objOuterLayer={};
			var OuterLayerArray=[];
			var objOuterLayerTwo={};
			var array=[];
			for (var i = 0; i< count+1;i++){
				var obj = {};
				obj.labelname=$("#box"+i+" input[name='labelText']").val();
				obj.id=$("#box"+i+" input[name='necessaryId']").val();
				obj.class=$("#box"+i+" input[name='necessaryClass']").val();
				obj.name=$("#box"+i+" input[name='nameText']").val();
				obj.elementType=$("#box"+i+" input[name='elementTypeText']").val();
				obj.type=$("#box"+i+" select option:selected").val();
				
					var myrolesObj={};
					var messagesinfoObj={};
					var selectRulesValue=[];//存放规则
					var selectRulesText=[];//存放规则对应提示
					$("#rolesBox"+count+" select").each(function(){
						selectRulesValue.push(this.value);
					});
					$("#rolesBox"+count+" input[name='myMsg']").each(function(){
						selectRulesText.push(this.value);
					});
					if(selectRulesValue.length!=selectRulesText.length){
						console.log("规则与提示信息必须对应");
						return;
					}
					for(var i=0;i<selectRulesValue.length;i++){
						myrolesObj['"'+selectRulesValue[i]+'"']=true;
						for(var x=0;x<selectRulesText.length;x++){
							messagesinfoObj['"'+selectRulesValue[i]+'"'] = selectRulesText[x];
						}
					}
					
					obj.myroles = myrolesObj;
					obj.messagesinfo = messagesinfoObj;
					//自定义验证数据获取
					var customMsg = {};
					var customText = {};
					var inputRoleName = [];//存放规则名
					var inputRoleMsg = [];//存放规则
					var inputRoleText = [];//存放提示信息
					$("#rolesBox"+count+" input[name='mycusName']").each(function(){
						inputRoleName.push(this.value);
					});
					$("#rolesBox"+count+" input[name='myRole']").each(function(){
						inputRoleMsg.push(this.value);
					});
					$("#rolesBox"+count+" input[name='myMsg']").each(function(){
						inputRoleText.push(this.value);
					});
					for(var j=0;j<inputRoleName.length;j++){
						if($("#rolesBox"+count+" select option:selected").text()==="自定义"){
							myrolesObj['"'+inputRoleName[j]+'"']=true;
						}
						for(var k=0;k<inputRoleMsg.length;k++){
							customMsg['"'+inputRoleName[j]+'"']=inputRoleMsg[j];
						}
						for(var q=0;q<inputRoleText.length;q++){
							customText['"'+inputRoleName[j]+'"']=inputRoleText[j];
						}
					}
					
					obj.myroles = myrolesObj;
					obj.customrules = customMsg;
					obj.promptText = customText;
				array.push(obj);
			}
			
			objOuterLayer.pwrapidname="#myform";
			objOuterLayer.elements=array;
			OuterLayerArray.push(objOuterLayer);
			objOuterLayerTwo.data=OuterLayerArray;
			console.log(objOuterLayerTwo);
        });
    </script>
