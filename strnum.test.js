const toNumber = require("./strnum");

describe("Should convert all the valid numeric strings to number", () => {
    it("should return undefined, null, empty string, or non-numeric as it is", () => {
        expect(toNumber(undefined)).not.toBeDefined();
        expect(toNumber(null)).toEqual(null);
        expect(toNumber("")).toEqual("");
        expect(toNumber("string")).toEqual("string");
    });
    it("should not parse number with spaces or comma", () => {
        expect(toNumber("12,12")).toEqual("12,12");
        expect(toNumber("12 12")).toEqual("12 12");
        expect(toNumber("12-12")).toEqual("12-12");
        expect(toNumber("12.12.12")).toEqual("12.12.12");
    })
    it("should consider + sign", () => {
        expect(toNumber("+12")).toEqual(12);
        expect(toNumber("12+12")).toEqual("12+12");
        expect(toNumber("1212+")).toEqual("1212+");
    })
    it("should parse hexaDecimal values", () => {
        expect(toNumber("0x2f")).toEqual(47);
        expect(toNumber("-0x2f")).toEqual(-47);
        expect(toNumber("0x2f", { hex :  true})).toEqual(47);
        expect(toNumber("-0x2f", { hex :  true})).toEqual(-47);
        expect(toNumber("0x2f", { hex :  false})).toEqual("0x2f");
        expect(toNumber("-0x2f", { hex :  false})).toEqual("-0x2f");
    })
    it("leading zeros", () => {
        expect(toNumber("06")).toEqual(6);
        expect(toNumber("06", { leadingZeros :  true})).toEqual(6);
        expect(toNumber("06", { leadingZeros :  false})).toEqual("06");

        expect(toNumber("006")).toEqual(6);
        expect(toNumber("006", { leadingZeros :  true})).toEqual(6);
        expect(toNumber("006", { leadingZeros :  false})).toEqual("006");
    })
    it("floating point and leading zeros", () => {
        expect(toNumber("0.0")).toEqual(0);
        expect(toNumber("00.00")).toEqual(0);
        expect(toNumber("0.06")).toEqual(0.06);
        expect(toNumber("00.6")).toEqual(0.6);
        expect(toNumber(".006")).toEqual(0.006);
        expect(toNumber("6.0")).toEqual(6);
        expect(toNumber("06.0")).toEqual(6);
        
        expect(toNumber("0.0",  { leadingZeros :  false})).toEqual(0);
        expect(toNumber("00.00",  { leadingZeros :  false})).toEqual("00.00");
        expect(toNumber("0.06",  { leadingZeros :  false})).toEqual(0.06);
        expect(toNumber("00.6",  { leadingZeros :  false})).toEqual("00.6");
        expect(toNumber(".006", { leadingZeros :  false})).toEqual(0.006);
        expect(toNumber("6.0"  ,  { leadingZeros :  false})).toEqual(6);
        expect(toNumber("06.0"  ,  { leadingZeros :  false})).toEqual("06.0");
    })
    it("negative number  leading zeros", () => {
        expect(toNumber("-06")).toEqual(-6);
        expect(toNumber("-06", { leadingZeros :  true})).toEqual(-6);
        expect(toNumber("-06", { leadingZeros :  false})).toEqual("-06");
        
        expect(toNumber("-0.0")).toEqual(-0);
        expect(toNumber("-00.00")).toEqual(-0);
        expect(toNumber("-0.06")).toEqual(-0.06);
        expect(toNumber("-00.6")).toEqual(-0.6);
        expect(toNumber("-.006")).toEqual(-0.006);
        expect(toNumber("-6.0")).toEqual(-6);
        expect(toNumber("-06.0")).toEqual(-6);
        
        expect(toNumber("-0.0"   ,  { leadingZeros :  false})).toEqual(-0);
        expect(toNumber("-00.00",  { leadingZeros :  false})).toEqual("-00.00");
        expect(toNumber("-0.06",  { leadingZeros :  false})).toEqual(-0.06);
        expect(toNumber("-00.6",  { leadingZeros :  false})).toEqual("-00.6");
        expect(toNumber("-.006",  {leadingZeros :  false})).toEqual(-0.006);
        expect(toNumber("-6.0"  ,  { leadingZeros :  false})).toEqual(-6);
        expect(toNumber("-06.0"  ,  { leadingZeros :  false})).toEqual("-06.0");
    })
    it("long number", () => {
        expect(toNumber("420926189200190257681175017717")  ).toEqual(4.209261892001902e+29);
        expect(toNumber("000000000000000000000000017717"  ,  { leadingZeros :  false})).toEqual("000000000000000000000000017717");
        expect(toNumber("000000000000000000000000017717"  ,  { leadingZeros :  true})).toEqual(17717);
    });
    it("scientific notation", () => {
        expect(toNumber("01.0e2"  ,  { leadingZeros :  false})).toEqual("01.0e2");
        expect(toNumber("-01.0e2"  ,  { leadingZeros :  false})).toEqual("-01.0e2");
        expect(toNumber("01.0e2") ).toEqual(100);
        expect(toNumber("-01.0e2") ).toEqual(-100);
        expect(toNumber("1.0e2") ).toEqual(100);

        expect(toNumber("-1.0e2") ).toEqual(-100);
        expect(toNumber("1.0e-2")).toEqual(0.01);
    });

    it("should skip matching pattern", () => {
        expect(toNumber("+12", { skipLike: /\+[0-9]{10}/} )).toEqual(12);
        expect(toNumber("12+12", { skipLike: /\+[0-9]{10}/} )).toEqual("12+12");
        expect(toNumber("12+1212121212", { skipLike: /\+[0-9]{10}/} )).toEqual("12+1212121212");
        expect(toNumber("+1212121212") ).toEqual(1212121212);
        expect(toNumber("+1212121212", { skipLike: /\+[0-9]{10}/} )).toEqual("+1212121212");
    })
    it("should not change string if not number", () => {
        expect(toNumber("+12 12")).toEqual("+12 12");
        expect(toNumber("    +12 12   ")).toEqual("    +12 12   ");
    })
    it("should ignore sorrounded spaces ", () => {
        expect(toNumber("   +1212   ")).toEqual(1212);
    })

});