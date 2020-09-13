Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={render:function anonymous(){with(this)return _c("div",{staticClass:"aui-number-input",class:[{"aui-number-input-focus":isFocus},{"aui-number-input-disabled":disabled},sizeClass]},[_t("prepend"),_v(" "),_c("input",{class:alignClass,attrs:{type:type,placeholder:placeholder,disabled:disabled,maxlength:maxlength,minlength:minlength,max:max,decimal:decimal,align:align,"data-allowed-chars":"0123456789"},domProps:{value:value},on:{input:handleInput,blur:blur,focus:focus,textInput:handleTextInput}})],2)},name:"aui-number-input",data:function(){return{isFocus:!1}},props:{align:{type:String,default:"left"},value:[String,Number],placeholder:{type:String,default:"请输入"},maxlength:Number,minlength:Number,max:Number,decimal:Number,disabled:{type:Boolean,default:!1},size:{type:String,default:"normal"},type:{type:String,default:"text",validator:function(e){return"password"===e||"text"===e}}},mounted:function(){var e=this;this.$el.querySelector("input").onkeydown=function(t){var a=t||window.event||arguments.callee.caller.arguments[0],n=t.target.value;if(a&&a.key>="0"&&a.key<="9"||"Backspace"==a.key||"."==a.key||"ArrowLeft"==a.key||"ArrowRight"==a.key){if(("."==a.key&&-1!=n.indexOf(".")||""==n)&&"."==a.key&&a.preventDefault(),"Backspace"==a.key&&Object.defineProperty(a,"key",{value:""}),(n=n.split("")).splice(a.target.selectionStart,a.target.selectionEnd-a.target.selectionStart,a.key),-1!=(n=n.join("")).indexOf("."))n.split(".")[1].length>e.decimal&&((n=n.split("")).splice(a.target.selectionStart,1),n=n.join(""),"Backspace"!=a.key&&"ArrowLeft"!=a.key&&"ArrowRight"!=a.key&&a.preventDefault());if(0==a.target.selectionStart&&"."==a.key&&a.preventDefault(),n>e.max&&"Backspace"!=a.key&&"ArrowLeft"!=a.key&&"ArrowRight"!=a.key&&a.preventDefault(),-1!=n.indexOf(".")){var i=n.indexOf("."),l=n.split(".");l[0]+l[1]>e.max&&a.target.selectionStart==i+1&&"Backspace"==a.key&&a.preventDefault()}a.target.selectionStart!=a.target.selectionEnd&&"Backspace"==a.key&&a.preventDefault()}else a.preventDefault()}},methods:{focus:function(){this.isFocus=!0,this.$emit("focus")},blur:function(){this.isFocus=!1,this.$emit("blur")},handleInput:function(e){var t=e.target.value;this.$emit("input",t),this.$emit("change",t)},handleTextInput:function(e){"e"==e.data&&e.preventDefault(),e.target.value.length+1>this.maxlength&&e.preventDefault()}},computed:{className:function(){return this.sizeClass+" "+this.alignClass},sizeClass:function(){return"aui-number-input-"+this.size},alignClass:function(){return"aui-number-input-"+this.align}}};