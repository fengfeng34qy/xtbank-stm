"";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={render:function anonymous(){with(this)return _c("div",{staticClass:"tile-dialog-item-wrapper"},[_c("div",{staticClass:"tile-dialog-item",class:{"tile-item-disable":!isEnabled}},[_c("div",{staticClass:"tile-dialog-item-content",class:{"item-with-active":isEnabled},on:{click:clickItem}},[_c("div",{staticClass:"tile-dialog-item-content-icon"},[_c("img",{attrs:{src:imgSrc}})]),_v(" "),_c("div",[_v(_s(title))])])])])},name:"tile-dialog-item",props:{imgSrc:String,title:String,isEnabled:Boolean},data:function(){return{}},methods:{clickItem:function(){this.isEnabled&&this.$emit("itemClicked")}}};