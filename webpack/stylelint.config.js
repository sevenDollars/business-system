module.exports = {
  rules: {
    // 禁止使用未知规则
    'at-rule-no-unknown': true,
    // 禁止空块
    'block-no-empty': true,
    // 禁止使用无效的十六进制颜色
    'color-no-invalid-hex': true,
    // 禁止空注释
    'comment-no-empty': true,
    // 禁止在声明块中使用重复的属性
    'declaration-block-no-duplicate-properties': [true, { ignore: ['consecutive-duplicates-with-different-values'] }],
    // 禁止覆盖覆盖相关的速记属性的速记属性
    'declaration-block-no-shorthand-property-overrides': true,
    // 禁止重复的字体系列名称
    'font-family-no-duplicate-names': true,
    // 禁止在字体系列名称列表中缺少通用系列
    'font-family-no-missing-generic-family-keyword': true,
    // 不允许在calc函数内使用空格运算符
    'function-calc-no-unspaced-operator': true,
    // 禁止在linear-gradient()调用中使用不符合标准语法的方向值
    'function-linear-gradient-no-nonstandard-direction': true,
    // 在关键帧声明中禁用!important
    'keyframe-declaration-no-important': true,
    // 禁止使用未知的媒体功能名称
    'media-feature-name-no-unknown': true,
    // 禁止覆盖较低特异性的选择器，而不是覆盖较高特异性的选择器
    'no-descending-specificity': true,
    // 禁止@import在样式表中使用重复规则
    'no-duplicate-at-import-rules': true,
    // 禁止在样式表中使用重复的选择器
    'no-duplicate-selectors': true,
    // 禁止空来源
    'no-empty-source': true,
    // 禁止使用多余的分号
    'no-extra-semicolons': true,
    // 禁止未知属性
    'property-no-unknown': true,
    // 禁止未知的伪类选择器
    'selector-pseudo-class-no-unknown': true,
    // 禁止使用未知的伪元素选择器
    'selector-pseudo-element-no-unknown': true,
    // 禁止未知类型选择器
    'selector-type-no-unknown': true,
    // 禁止在字符串中使用（未转义的）换行符
    'string-no-newline': true,
    // 禁止使用未知的单位
    'unit-no-unknown': true,
  },
};
