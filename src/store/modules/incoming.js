import { save, sub } from '@/api/incoming'
import { Message } from 'element-ui'

const state = {
  full_name: '', // 商户全称
  short_name: '', // 商户简称
  city: '', // 城市
  province: '', // 商户所属省份
  area: '', // 地区
  customer_type: 'COMPANY', // 商户类型
  industry: '', // 商户所属行业
  district: '', // 详细地址
  link_man: '', // 商户联系人
  link_phone: '', // 商户联系电话
  license: '', // 营业执照号码
  license_end: '', // 营业执照结束时间
  license_start: '', // 营业执照开始时间
  license_name: '', // 营业执照全称
  license_pic: '', // 营业执照图片
  postal_address: '', // 营业执照注册地址
  contact_phone_num: '', // 联系人手机号
  link_man_id: '', // 联系人身份证
  organization_code: '', // 组织结构代码
  tax_certification: '', // 税务登记证
  account_open_license_name: '', // 开户许可证名称
  account_open_license: '', // 开户许可证
  account_open_license_pic: '', // 开户许可证图片
  shop_outside_pic: '', // 店外照片
  shop_door_pic: '', // '门头照'
  shop_inside_pic: '', // '店内照'
  shop_cashier_desk_pic: '', // 收银台照片
  tax_certification_pic: '', // 税务登记证图片地址
  organization_pic: '', // 组织机构代码证图片地址
  is_legal_name_account: '1', // 是否法人
  // 法人信息
  certificate_type: '1', // 证件类型
  certificate_code: '', // 法人身份证编号
  certificate_name: '', // 法人身份证姓名
  certificate_start_date: '', // 法人证件开始日期
  certificate_end_date: '', // 法人证件结束时间日期
  id_card_front_pic: '', // 法人身份证照片正面地址
  id_card_back_pic: '', // 法人身份证照片背面地址
  id_card_hand_pic: '', // 法人手持身份证图片地址
  // 支付信息
  // 事业单位
  cert_num: '', // 证书编号
  cert_type: '', // 特殊资质证书
  certificate_file_pic: '', // 事业单位证明函
  unified_social_credit_code_pic: '', // 统一信用代码证地址
  // 企业非法人
  settler_hold_certificate_pic: '', // 非法人结算人手持身份证照片地址
  settler_hold_bank_card_pic: '', // 非法人结算人手持银行卡照片地址'"`
  settler_certificate_back_pic: '', // 结算人身份证照片背面地址
  settler_certificate_front_pic: '', // 结算人身份证照片正面地址
  settler_authorization_pic: '', // 非法人结算授权照片
  settler_name: '', // 结算人姓名
  settle_type: '', //
  account_type: 'PUBLIC', // 账户类型
  bank_account_name: '', // 银行账户名称
  bank_account_num: '', // 银行账户卡号
  bank_province: '', // 银行所属省份
  bank_city: '', // 银行所属城市
  bank_area: '', // 银行地区
  bank_branch_name: '', // 银行分行名称
  bank_name: '', // 银行名称,
  settle_amount: '', // 结算金额，起结金额必须大于等于1
  phone: '', // 银行预留手机号
  settler_certificate_code: '', // 结算人身份证号
  settler_certificate_start_date: '', // 结算人身份证开始时间,
  settler_certificate_end_date: '', // 结算人身份证结束时间
  bank_card_pic: '', // 银行卡正面图片
  // 程序
  we_chat_name: '', // 公众号主体名称
  we_chat_app_id: '', // 微信公众号appid
  we_chat_program_id: '', // 微信小程序ID
  we_chat_link: '', // 微信联系人微信号
  pay_dir: '', // 支付目录
}

const mutations = {
  BUILDARG: (state, args) => {
    for (const keys in args) {
      state[keys] = args[keys]
    }
    console.log(state)
    return state
  },
}

const actions = {
  build: ({ commit }, args) => {
    console.log(args)
    commit('BUILDARG', args)
  },
  save: ({ state }) => {
    console.log(state)
    save(state).then(res => {
      Message.success('保存成功')
    }).catch(e => {
      Message.success('保存失败')
    })
  },
  submit: ({ state }) => {
    sub(state).then(res => {
      Message.success('提交成功')
    }).catch(e => {
      Message.success('提交失败')

    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
