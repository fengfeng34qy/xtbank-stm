// "";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={render:function anonymous(){with(this)return _c("button",{staticClass:"aui-button",class:[types,sizes,cornerTypes,classBtn,auiIconName],attrs:{disabled:disabled,fill:fill},on:{click:handleClick}},["bottom"===size?_c("div",{staticClass:"aui-button-icon"},[_c("i",{class:[auiIconNames]})]):_e(),_v(" "),$slots.default?_c("span",[_t("default")],2):_e()])},name:"aui-button",props:{disabled:Boolean,fill:Boolean,type:{type:String,default:"default"},size:String,cornerType:{type:String,default:"default-corner"},auiIconName:""},methods:{handleClick:function(t){this.disabled||this.$emit("click",t)}},computed:{types:function(){if(this.type)return"aui-button--"+this.type},sizes:function(){if(this.size)return"aui-button--"+this.size},auiIconNames:function(){if(this.auiIconName)return"aui-icon-"+this.auiIconName},cornerTypes:function(){if(this.cornerType)return"aui-button--"+this.cornerType},classBtn:function(){var t={};return t["aui-button--is-fill"]=this.fill,t["aui-button--is-disabled"]=this.disabled,t}}};
"";
Object.defineProperty(exports, "__esModule", {
	value: !0
}), 
exports.
default = {
	render: function anonymous() {
		with(this) return _c("button", {
			staticClass: "aui-button",
			class: [types, sizes, cornerTypes, classBtn, auiIconName],
			attrs: {
				disabled: disabled,
				fill: fill
			},
			on: {
				click: handleClick
			}
		}, ["bottom" === size ? _c("div", {
			staticClass: "aui-button-icon"
		}, [_c("i", {
			class: [auiIconNames]
		})]) : _e(), _v(" "), $slots.
	default ?_c("span", [_t("default")], 2):
		_e()])
	},
	name: "aui-button",
	props: {
		disabled: Boolean,
		fill: Boolean,
		type: {
			type: String,
		default:
			"default"
		},
		size: String,
		cornerType: {
			type: String,
		default:
			"default-corner"
		},
		auiIconName: ""
	},
	methods: {
		handleClick: function(t) {
			this.disabled || this.$emit("click", t)
		}
	},
	computed: {
		types: function() {
			if (this.type) return "aui-button--" + this.type
		},
		sizes: function() {
			if (this.size) return "aui-button--" + this.size
		},
		auiIconNames: function() {
			if (this.auiIconName) return "aui-icon-" + this.auiIconName
		},
		cornerTypes: function() {
			if (this.cornerType) return "aui-button--" + this.cornerType
		},
		classBtn: function() {
			var t = {};
			return t["aui-button--is-fill"] = this.fill, t["aui-button--is-disabled"] = this.disabled, t
		}
	}
};
