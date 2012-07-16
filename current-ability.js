// {"rules":[{"match_all":false,"base_behavior":true,"actions":["manage"],"subjects":["all"],"conditions":{},"block":null}]}

currentAbility = {
  can: function (action, subject) {
    matching_rules = _.filter(rules, function (rule) {
    });
  },
  rules: [
    {
      "match_all":false,
      "base_behavior":true,
      "actions":["manage"],
      "subjects":["all"],
      "conditions":{},
      "block":null
    }
  ]
}


function Rule(attributes) {
  this.actions = attributes.actions;
  this.subjects = attributes.subjects;
  this.conditions = attributes.conditions;
  this.matchAll = (this.actions === undefined && this.subjects === undefined);

  this.relevant = function (action, subject) {
    return this.matchAll || (this.matchesAction(action) && this.matchesSubject(subject));
  };

  this.matchesAction = function (action) {
    return _(this.actions).include("manage") || _(this.actions).include(action)
  };

  this.matchesSubject = function (subject) {
    return _(this.subjects).include("all") || _(this.subjects).include(subject)
  };

  this.matchesConditions = function() {
    if (this.conditions === undefined || _(this.conditions).isEmpty()) {
      return true;
    } else {
      throw {
        name: 'Warning',
        message: 'cancan.js does not support rule conditions yet'
      };
    };
  };

};

function Ability(currentAbility) {
  this.rules = _(currentAbility.rules).map(function (rule) {
    return new Rule(rule);
  });

  this.can = function (action, subject) {
    match = _(this.relevant_rules(action, subject)).find(function (rule) {
      return rule.matchesConditions();
    });

    if (match) {
      return match.baseBehavior;
    } else {
      return false;
    };
  };

  this.relevant_rules = function (action, subject) {
    return _(ability.rules).filter(function (rule) {
      return rule.relevant(action, subject);
    });
  };

};


