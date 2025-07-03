import { ChevronDown } from "lucide-react";

export default function InputField({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
  options = [],
  checked,
  _variant = "default",
  label,
  icon: Icon,
  selectPlaceholder = "-- 請選擇 Option --",
  rows = 4,
}) {
  const baseInputStyle =
    "w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent";

  const checkboxRadioWrapperStyle =
    "flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors";

  const checkboxRadioInputStyle =
    "w-4 h-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600";

  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <div className="relative">
            <select
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              required={required}
              className={`${baseInputStyle} appearance-none pr-10 ${className}`}
            >
              <option value="">{selectPlaceholder}</option>
              {options.map((opt) => (
                <option key={opt.value || opt.id} value={opt.value || opt.id}>
                  {opt.label || opt.name} {opt.type && `(${opt.type})`}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        );

      case "radio":
      case "checkbox":
        return (
          <label className={`${checkboxRadioWrapperStyle} ${className}`}>
            <input
              id={id}
              name={name}
              type={type}
              checked={checked}
              value={value}
              onChange={onChange}
              required={required}
              className={`${checkboxRadioInputStyle} ${
                type === "checkbox" ? "rounded" : ""
              }`}
            />
            {Icon && (
              <Icon className="w-4 h-4 mx-3 text-gray-500 dark:text-gray-400" />
            )}
            <span className="text-gray-700 dark:text-gray-300">{label}</span>
          </label>
        );

      case "textarea":
        return (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            rows={rows}
            className={`${baseInputStyle} resize-vertical ${className}`}
          />
        );

      case "number":
      case "text":
      default:
        return (
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            autoComplete="off"
            className={`${baseInputStyle} ${className}`}
          />
        );
    }
  };

  return (
    <div className="">
      {type !== "radio" && type !== "checkbox" && label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label} {required ? <span className="text-red-500">*</span> : null}
        </label>
      )}
      {renderInput()}
    </div>
  );
}

// 使用範例
// 1. 基本文字輸入
// jsx<InputField
//   id="username"
//   name="username"
//   type="text"
//   value={form.username}
//   onChange={handleChange}
//   label="用戶名稱"
//   placeholder="請輸入用戶名稱"
//   required
// />
// 2. 數字輸入
// jsx<InputField
//   id="sortOrder"
//   name="sortOrder"
//   type="number"
//   value={form.sortOrder}
//   onChange={handleChange}
//   label="排序 (sort_order)"
//   placeholder="請輸入數字"
//   className="text-sm"
// />
// 3. 下拉選單 (Select)
// jsx// 基本選單
// <InputField
//   id="category"
//   name="category"
//   type="select"
//   value={form.category}
//   onChange={handleChange}
//   label="選擇類別"
//   options={[
//     { id: 'food', name: '食品' },
//     { id: 'drink', name: '飲料' },
//     { id: 'dessert', name: '甜點' }
//   ]}
//   required
// />

// // 帶有 type 顯示的選單
// <InputField
//   id="option"
//   name="option"
//   type="select"
//   value={form.option}
//   onChange={handleChange}
//   label="選擇選項"
//   options={[
//     { id: 'opt1', name: '選項一', type: 'basic' },
//     { id: 'opt2', name: '選項二', type: 'premium' }
//   ]}
//   selectPlaceholder="-- 請選擇 Option --"
// />

// // 商家選擇範例
// <InputField
//   id="merchant_id"
//   name="merchant_id"
//   type="select"
//   value={form.merchant_id}
//   onChange={handleChange}
//   label="選擇商家"
//   selectPlaceholder="-- Please select a merchant --"
//   options={merchants.map(m => ({
//     id: m.id,
//     name: m.business_name
//   }))}
//   required
// />
// 4. 單選框 (Radio)
// jsx<div className="space-y-3">
//   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//     篩選類型
//   </label>

//   <InputField
//     id="filter_user"
//     name="filterType"
//     type="radio"
//     value="user_id"
//     checked={filterType === "user_id"}
//     onChange={() => setFilterType("user_id")}
//     label="依 user_id"
//     icon={User}
//   />

//   <InputField
//     id="filter_merchant"
//     name="filterType"
//     type="radio"
//     value="merchant_id"
//     checked={filterType === "merchant_id"}
//     onChange={() => setFilterType("merchant_id")}
//     label="依 merchant_id"
//     icon={Building}
//   />
// </div>
// 5. 複選框 (Checkbox)
// jsx<InputField
//   id="required"
//   name="required"
//   type="checkbox"
//   checked={form.required}
//   onChange={(e) => setForm({...form, required: e.target.checked})}
//   label="是否必選"
//   icon={Package}
// />

// <InputField
//   id="terms"
//   name="terms"
//   type="checkbox"
//   checked={form.acceptTerms}
//   onChange={(e) => setForm({...form, acceptTerms: e.target.checked})}
//   label="我同意服務條款"
//   required
// />
// 6. 文字區域 (Textarea)
// jsx// 基本 textarea
// <InputField
//   id="description"
//   name="description"
//   type="textarea"
//   value={form.description}
//   onChange={handleChange}
//   label="商品描述"
//   placeholder="請輸入詳細描述..."
//   required
// />

// // 自訂行數的 textarea
// <InputField
//   id="notes"
//   name="notes"
//   type="textarea"
//   value={form.notes}
//   onChange={handleChange}
//   label="備註"
//   placeholder="請輸入備註..."
//   rows={6}
//   className="text-sm"
// />
