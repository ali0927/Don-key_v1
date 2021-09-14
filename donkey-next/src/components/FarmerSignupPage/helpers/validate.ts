const validationsRulesList: any = {
  required: (value: string) => {
    if (value === "") {
      return true;
    }
    return false;
  },
  min: (value: string, minValue: string) => {
    if (value.length < parseFloat(minValue)) {
      return true;
    }
    return false;
  },
  max: (value: string, maxValue: string) => {
    if (value.length > parseFloat(maxValue)) {
      return true;
    }
    return false;
  },
  regex: (value: string, regex: string) => {
    const pattern = new RegExp(regex);
    if (!value.match(pattern)) {
      return true;
    }
    return false;
  },
};

const extractRule = (rule: string) => {
  // let finalRule: { key: string; value: string } | string = "";
  if (rule.indexOf(":") > 0) {
    const arr = rule.split(":");
    return  {
      key: arr[0],
      value: arr[1],
    };
  }
  return rule;
};

export const validate = (
  value: string,
  rules: { rule: string; errMessage: string }[]
): { rule: string; msg: string } | null => {
  let err: { rule: string; msg: string } | null = null;
  rules.forEach((rule, index) => {
    if (!err) {
      const finalRule = extractRule(rule.rule);
      if (typeof finalRule === "object") {
        const isError = validationsRulesList[finalRule.key](
          value,
          finalRule.value
        );
        if (isError) {
          err = { rule: finalRule.key, msg: rule.errMessage };
          return false;
        }
      } else {
        const isError = validationsRulesList[finalRule](value);
        if (isError) {
          err = { rule: finalRule, msg: rule.errMessage };
          return false;
        }
      }
    }
  });

  return err;
};

