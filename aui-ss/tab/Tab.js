"";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={render:function anonymous(){with(this)return _c("div",{staticClass:"aui-tabs"},[_c("div",{staticClass:"aui-tabs_header"},_l(tabName,function(t,e){return _c("div",{key:e,staticClass:"aui-tabs_item",class:{active:activeIndex===e,"aui-tabs-pane-container--disabled":t._props.disabled},on:{click:function(t){activeItemClick(e)}}},[_v(_s(t.label)+"\n    ")])})),_v(" "),_c("div",{staticClass:"aui-tabs_container"},[_t("default")],2)])},name:"aui-tabs",props:{},data:function(){return{tabName:[],activeIndex:0}},methods:{addPanes:function(t){this.tabName.push(t),console.log(this.tabName)},activeItemClick:function(t){this.tabName[t]._props.disabled||(this.$emit("tab-changed",t+1,this.activeIndex+1),this.activeIndex=t,this.activeItem(t))},activeItem:function(t){this.$children.forEach(function(e,a){return e.isActive=a===t})}},mounted:function(){console.log(this.$children),this.activeItem(this.activeIndex)}};