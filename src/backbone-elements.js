(function (w) {

    var PROPERTY_DELIMITER_CHARACTERS = [':', '-', '_'];

    var registrationFunction = (document.registerElement || document.register).bind(document);

    if (registrationFunction === undefined) {
        return;
    }

    var registerBackbone = function (elementName, viewClass) {
        var elementPrototype = Object.create(HTMLElement.prototype);
        elementPrototype.createdCallback = function () {
            var attributesObjects = getAllProperties(this, this.attributes);
            this._content = getContentNodes(this);

            this.backboneElement = new viewClass(extend({'el': $(this), '_content': this._content}, attributesObjects, true));
            this.backboneElement._content = this._content;
            this.backboneElement.attributes = attributesObjects;
            extend(this, this.backboneElement, false, true);
        };

        elementPrototype.attributeChangedCallback = function () {
            var attributesObjects = getAllProperties(this, this.attributes);
            extend(this.backboneElement.attributes, attributesObjects, true);

            if (this.backboneElement.attributeChanged !== undefined && typeof this.backboneElement.attributeChanged === 'function') {
                this.backboneElement.attributeChanged.apply(this.backboneElement, [attributesObjects]);
            }
        }

        registrationFunction(elementName, {
            prototype: elementPrototype
        });
    };

    document.registerBackbone = registerBackbone;

    if (w.xtag !== undefined) {
        w.xtag.registerBackbone = registerBackbone;
    }

    var extend = function (extandable, extending, replace, bindToElement) {
        for (var i in extending) {
            if (extandable[i] === undefined || replace === true) {

                if (typeof extending[i] === 'function') {
                    if (bindToElement === true) {
                        extandable[i] = extending[i].bind(extandable.backboneElement);
                    } else {
                        extandable[i] = extending[i].bind(extandable);
                    }
                } else {
                    extandable[i] = extending[i];
                }
            }
        }
        return extandable;
    };

    var getContentNodes = function (el) {
        var fragment = document.createElement('content');
        while (el.childNodes.length) {
            fragment.appendChild(el.childNodes[0]);
        }
        return fragment;
    };

    var getAllProperties = function (el, attributes) {
        var result = {};

        for (var i = 0; i < attributes.length; i++) {
            var attribute = attributes[i];
            var propertyName = attributeNameToPropertyName(attribute.name);
            result[propertyName] = parseAttributeValue(attributes[i].value);
        }

        result._content = el._content;
        return result;
    };

    var attributeNameToPropertyName = function (attributeName) {
        var result = attributeName.replace('x-', '').replace('data-', '');
        var delimiterIndex = -1;

        while ((delimiterIndex = getNextDelimiterIndex(result)) !== -1) {
            result = result.slice(0, delimiterIndex) + result.charAt(delimiterIndex + 1).toUpperCase() + result.slice(delimiterIndex + 2, result.length);
        }

        return result;
    };

    var getNextDelimiterIndex = function (string) {
        var result = -1;

        for (var i = 0; i < PROPERTY_DELIMITER_CHARACTERS.length; i++) {
            var char = PROPERTY_DELIMITER_CHARACTERS[i];
            result = string.indexOf(char);
            if (result !== -1) {
                break;
            }
        }

        return result;
    }

    var parseAttributeValue = function (value) {
        var regexp = /\{.*?\}/g;
        var matches = value.match(regexp);

        if (matches !== null && matches !== undefined && matches.length > 0) {
            value = eval(matches[0].replace('{', '').replace('}', ''));
        }

        return value;
    };

    var getterSetter = function (variableParent, variableName, getterFunction, setterFunction) {
        if (Object.defineProperty) {
            Object.defineProperty(variableParent, variableName, {
                get: getterFunction,
                set: setterFunction
            });
        }
        else if (document.__defineGetter__) {
            variableParent.__defineGetter__(variableName, getterFunction);
            variableParent.__defineSetter__(variableName, setterFunction);
        }

        variableParent["get" + variableName] = getterFunction;
        variableParent["set" + variableName] = setterFunction;
    };
})(window);

//Mozilla bind polyfill
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {
            },
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                    ? this
                    : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}
