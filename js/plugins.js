// http://james.padolsey.com/javascript/regex-selector-for-jquery/
// jQuery.expr[':'].regex = function(elem, index, match) {
//   var matchParams = match[3].split(','),
//     validLabels = /^(data|css):/,
//     attr = {
//       method: matchParams[0].match(validLabels) ?
//             matchParams[0].split(':')[0] : 'attr',
//       property: matchParams.shift().replace(validLabels,'')
//     },
//     regexFlags = 'ig',
//     regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
//   return regex.test(jQuery(elem)[attr.method](attr.property));
// }

// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {   arguments.callee = arguments.callee.caller;   var newarr = [].slice.call(arguments);   (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

