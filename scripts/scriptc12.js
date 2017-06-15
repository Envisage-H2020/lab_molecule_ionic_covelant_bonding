/*jslint white: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 14 */
/*global window: false, REDIPS: true */

/* enable strict mode */
"use strict";

var redips = {};
var redipsInit;
var rd = REDIPS.drag;
var idCheck;
var nRow;
var nCol;
var numTotal = 0;

var molGIFs = new Array();
var bondGIFs = new Array();

var dispStructure = new Array();
var ansrStructure = new Array();
var dispStructureIDX = 0;
var learnerKey = "";
var learnerAnswer = "";
var currentMol = 1;
var BackResetTrue = 0;
var molInfo = "<b>Hydrogen chloride.</b> At room temperature, it is a colorless gas, which forms white fumes of hydrochloric acid upon contact with atmospheric humidity. Hydrogen chloride gas and hydrochloric acid are important in technology and industry. Hydrochloric acid, the aqueous solution of hydrogen chloride, is also commonly given the same formula as Hydrogen chloride.";
var molName = "Hydrogen chloride";

var resultArray = [];

var molArray = {};
molArray[1] = new Array("<td colspan='1' class='trash'>Trash</td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/redH.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/blueCl.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>");
						
molArray[2] = new Array("<td colspan='1' class='trash'>Trash</td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/redK.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/blueBr.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>");


molArray[3] = new Array("<td colspan='1' class='trash'>Trash</td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/redH.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/blueO.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/redH.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td>");

molArray[4] = new Array("<td colspan='1' class='trash'>Trash</td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/redNa.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/blueF.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>");

molArray[5] = new Array("<td colspan='1' class='trash'>Trash</td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/redH.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/redH.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/blueC.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/redH.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/redH.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>");
						
molArray[6] = new Array("<td colspan='1' class='trash'>Trash</td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/redCL.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/blueCa.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/redCl.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td>");						
			
molArray[7] = new Array("<td colspan='1' class='trash'>Trash</td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/redNa.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/blueCl.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>");
			
			
molArray[8] = new Array("<td colspan='1' class='trash'>Trash</td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/blueF.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/blueF.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/redC.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/blueF.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='2' rowspan='2' class='moleculeStop mark'><img src='images/discs/blueF.png' width='100%'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>",
						"<td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeAtom single'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td><td colspan='1' class='moleculeStop mark'></td>");

						
						
						
						
var atomNames = new Array();
	atomNames[1] = "2";
	atomNames[2] = "3";
	atomNames[3] = "4";
	atomNames[4] = "Br";
	atomNames[5] = "Ca";
	atomNames[6] = "C";
	atomNames[7] = "Cl";
	atomNames[8] = "F";
	atomNames[9] = "H";
	atomNames[10] = "K";
	atomNames[11] = "Na";
	atomNames[12] = "O";
	
var answerKeys = new Array();	
	answerKeys[1] = "HCl";
	answerKeys[2] = "KBr";
	answerKeys[3] = "H2O";
	answerKeys[4] = "NaF";
	answerKeys[5] = "CH4";
	answerKeys[6] = "CaCl2";
	answerKeys[7] = "NaCl";
	answerKeys[8] = "CF4";
	
function preLoadIMG(){
	molGIFs[1] = new Image();
	molGIFs[1].src = "images/gifs/hydrogenchloride.gif";
	molGIFs[2] = new Image();
	molGIFs[2].src = "images/gifs/potassiumbromide.gif";
	molGIFs[3] = new Image();
	molGIFs[3].src = "images/gifs/water2.gif";
	molGIFs[4] = new Image();
	molGIFs[4].src = "images/gifs/sodiumfluoride.gif";
	molGIFs[5] = new Image();
	molGIFs[5].src = "images/gifs/methane2.gif";
	molGIFs[6] = new Image();
	molGIFs[6].src = "images/gifs/calciumchloride.gif";
	molGIFs[7] = new Image();
	molGIFs[7].src = "images/gifs/sodiumchloride.gif";
	molGIFs[8] = new Image();
	molGIFs[8].src = "images/gifs/Tetrafluoromethane.gif";
	

	bondGIFs[1] = new Image();
	bondGIFs[1].src = "images/gifs/BondHydrogenChloride.gif";
	bondGIFs[2] = new Image();
	bondGIFs[2].src = "images/gifs/BondPotassiumBromide.gif";	
	bondGIFs[3] = new Image();
	bondGIFs[3].src = "images/gifs/BondWater.gif";	
	bondGIFs[4] = new Image();
	bondGIFs[4].src = "images/gifs/BondSodiumFluoride.gif";	
	bondGIFs[5] = new Image();
	bondGIFs[5].src = "images/gifs/BondMethane.gif";
	bondGIFs[6] = new Image();
	bondGIFs[6].src = "images/gifs/BondCalciumChloride.gif";
	bondGIFs[7] = new Image();
	bondGIFs[7].src = "images/gifs/BondSodiumChloride.gif";
	bondGIFs[8] = new Image();
	bondGIFs[8].src = "images/gifs/BondTetrafluoromethane.gif";	
}

var molDetail = new Array();
	molDetail[1] = "<b>Hydrogen chloride.</b> At room temperature, it is a colorless gas, which forms white fumes of hydrochloric acid upon contact with atmospheric humidity. Hydrogen chloride gas and hydrochloric acid are important in technology and industry. Hydrochloric acid, the aqueous solution of hydrogen chloride, is also commonly given the same formula as Hydrogen chloride.";
	molDetail[2] = "<b>Potassium bromide</b> is a salt, widely used as an anticonvulsant and a sedative in the late 19th and early 20th centuries, with over-the-counter use extending to 1975 in the US. Its action is due to the bromide ion (sodium bromide is equally effective). Potassium bromide is used as a veterinary drug, as an antiepileptic medication for dogs. ";
	molDetail[3] = "<b>Water</b> covers 71% of the Earth's surface. It is vital for all known forms of life. On Earth, 96.5% of the planet's water is found in seas and oceans, 1.7% in groundwater, 1.7% in glaciers and the ice caps of Antarctica and Greenland, a small fraction in other large water bodies, and 0.001% in the air as vapor, clouds (formed of solid and liquid water particles suspended in air), and precipitation.";
	molDetail[4] = "<b>Sodium fluoride</b> is an inorganic chemical compound with the formula [---]. A colorless solid, it is a source of the fluoride ion in diverse applications. Sodium fluoride is less expensive and less hygroscopic than the related salt potassium fluoride. Sodium fluoride is an ionic compound, dissolving to give separated [---] and [---] ions. The mineral form of Sodium fluoride, villiaumite, is moderately rare. It is known from plutonic nepheline syenite.";
	molDetail[5] = "<b>Methane</b> is the simplest alkane and the main component of natural gas. The relative abundance of methane makes it an attractive fuel, though capturing and storing it may pose challenges due to its gaseous state found at normal conditions. In its natural state, methane is found both below ground, and under the sea floor, where it often finds its way to the surface and in the earth's atmosphere where it is known as atmospheric methane.";
	molDetail[6] = "<b>Calcium chloride</b> is a salt of calcium and chlorine. It behaves as a typical ionic halide, and is solid at room temperature. Common applications include brine for refrigeration plants, ice and dust control on roads, and desiccation. Because of its hygroscopic nature, anhydrous calcium chloride must be kept in tightly sealed, air-tight containers.";
	molDetail[7] = "<b>Sodium chloride</b>, also known as salt, common salt, table salt or halite, is an ionic compound. Sodium chloride is the salt most responsible for the salinity of the ocean and of the extracellular fluid of many multicellular organisms. In the form of edible or table salt it is commonly used as a condiment and food preservative. Large quantities of sodium chloride are used in many industrial processes, and it is a major source of sodium and chlorine compounds used as feedstocks for further chemical syntheses. ";
	molDetail[8] = "<b>Tetrafluoromethane</b>, also known as carbon tetrafluoride, is the simplest fluorocarbon. It has a very high bond strength due to the nature of the carbon-fluorine bond. It can also be classified as a haloalkane or halomethane. Because of the multiple carbon-fluorine bonds, and the highest electronegativity of fluorine, the carbon in tetrafluoromethane has a significant positive partial charge which strengthens and shortens the four carbon-fluorine bonds by providing additional ionic character. Tetrafluoromethane is a potent greenhouse gas.";	
	
var bondDetail = new Array();
	bondDetail[1] = "<b>Hydrogen chloride.</b> Yes, you have correctly selected the correct bonding for this molecule. In the animation you can see the bonding between the Hydrogen and Chlorine atoms.<br><br>Use the button below to return to the molecule selection section.<br><br><button onclick='returnToSelection()'>Return to Selection</button><br>";
	bondDetail[2] = "<b>Potassium bromide.</b> Yes, you have correctly selected the correct bonding for this molecule. In the animation you can see the bonding between the Potassium and Bromine atoms.<br><br>Use the button below to return to the molecule selection section.<br><br><button onclick='returnToSelection()'>Return to Selection</button><br>";
	bondDetail[3] = "<b>Water.</b> Yes, you have correctly selected the correct bonding for this molecule. In the animation you can see the bonding between the Hydrogen and Oxygen atoms.<br><br>Use the button below to return to the molecule selection section.<br><br><button onclick='returnToSelection()'>Return to Selection</button><br>";
	bondDetail[4] = "<b>Sodium fluoride.</b> Yes, you have correctly selected the correct bonding for this molecule. In the animation you can see the bonding between the Sodium and Fluorine atoms.<br><br>Use the button below to return to the molecule selection section.<br><br><button onclick='returnToSelection()'>Return to Selection</button><br>";
	bondDetail[5] = "<b>Methane.</b> Yes, you have correctly selected the correct bonding for this molecule. In the animation you can see the bonding between the Carbon and Hydrogen atoms.<br><br>Use the button below to return to the molecule selection section.<br><br><button onclick='returnToSelection()'>Return to Selection</button><br>";
	bondDetail[6] = "<b>Calcium chloride.</b> Yes, you have correctly selected the correct bonding for this molecule. In the animation you can see the bonding between the Calcium and Chlorine atoms.<br><br>Use the button below to return to the molecule selection section.<br><br><button onclick='returnToSelection()'>Return to Selection</button><br>";
	bondDetail[7] = "<b>Sodium chloride.</b> Yes, you have correctly selected the correct bonding for this molecule. In the animation you can see the bonding between the Sodium and Chlorine atoms.<br><br>Use the button below to return to the molecule selection section.<br><br><button onclick='returnToSelection()'>Return to Selection</button><br>";
	bondDetail[8] = "<b>Tetrafluoromethane.</b> Yes, you have correctly selected the correct bonding for this molecule. In the animation you can see the bonding between the Carbon and Fluorine atoms.<br><br>Use the button below to return to the molecule selection section.<br><br><button onclick='returnToSelection()'>Return to Selection</button><br>";	
	
	
var molBondingType = new Array();
	molBondingType[1] = "2";
	molBondingType[2] = "1";
	molBondingType[3] = "2";
	molBondingType[4] = "1";
	molBondingType[5] = "3";
	molBondingType[6] = "1";
	molBondingType[7] = "1";
	molBondingType[8] = "1";
	
redipsInit = function () {	

	// initialization
	rd.init();
	// set hover color
	rd.hover.colorTd = '#9BB3DA';
	// this function (event handler) is called after element is dropped
	rd.event.dropped = function () {
		idCheck = parseInt(rd.obj.id.substring(1,3));
		nRow = rd.getPosition()[1];
		nCol = rd.getPosition()[2];
		var cellNum = (nRow*12) + nCol;
		numTotal++;
		var event_value  = rd.obj.id.substring(1,3)
		if (rd.obj.id.substring(1,3) == 18)
			event_value = 'blue'
		if (rd.obj.id.substring(1,3) == 25)
			event_value = 'red'

		dataLayer.push({'event': 'set.electron', 'event_id': answerKeys[document.getElementById('moleculeSelect').value] , 'event_value': event_value });

		document.getElementById('thisMol').innerHTML = molName;
		//GetCellValues();	
	};
	
	rd.event.clicked = function () {
		var itemID = rd.obj.id;
	};
};
	
// add onload event listener
if (window.addEventListener) {
	window.addEventListener('load', redipsInit, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', redipsInit);
}

/*
window.onload = function() {
  hidetherow();
};
*/
	
function buildTopTable(){
	var areaStr = topTableStartStr+topTableChoiceRowStr+topTableEndStr;
	document.getElementById('topArea').innerHTML = areaStr;
}

function addToName(ind){
	if(BackResetTrue === 0){
		var atomTemp = atomNames[ind];
		var atomElement = atomTemp;
		ansrStructure[dispStructureIDX] = atomTemp;
		if(ind <= 3){
			atomElement = "<sub>"+atomTemp+"</sub>";
		}
		dispStructure[dispStructureIDX] = atomElement;
		dispStructureIDX++;
		updateMolName();
	}
}

function updateMolName(){
	learnerKey = "";
	learnerAnswer = "";
	for(var x = 0; x<=(dispStructure.length-1); x++){
		learnerKey = learnerKey+dispStructure[x];
		learnerAnswer = learnerAnswer+ansrStructure[x];
	}
	document.getElementById('molFormula').innerHTML = learnerKey;
}

function backSpace2(){
	if(BackResetTrue === 0){
		var aLength = dispStructure.length;
		if(aLength > 0){
			dispStructure.splice(aLength - 1,1);
			ansrStructure.splice(aLength - 1,1);
			dispStructureIDX--;
			updateMolName();
		}	
	}
}

function resetName(){
	if(BackResetTrue === 0){
		dispStructureIDX = 0;
		dispStructure = [];
		ansrStructure = [];
		learnerKey = "";
		learnerAnswer = "";
		document.getElementById('molFormula').innerHTML = learnerKey;
	}
}

function changeMolecule(){
	if(BackResetTrue === 0){
		var atomObj = document.getElementById("moleculeSelect"); 
		currentMol = parseInt(atomObj.options[atomObj.selectedIndex].value);
		molName = atomObj.options[atomObj.selectedIndex].innerHTML;
		molInfo = molDetail[currentMol];
		document.getElementById("displayGIF").src = molGIFs[currentMol].src;
		document.getElementById('molInfo').innerHTML = molInfo;
		resetName();
	}
}

function checkResult(){
	if(BackResetTrue === 0){
		BackResetTrue = 1;
		var result = "Incorrect";
		var trueAnswer = answerKeys[currentMol];
		if(learnerAnswer === trueAnswer){
			dataLayer.push({'event': 'check.bond', 'event_id': answerKeys[document.getElementById('moleculeSelect').value] , 'event_value': 1  });
			result = "That is correct. The formula for "+molName+" is "+learnerKey+".<br><br> Now please use the buttons below to indicate the type of bonding applicable for "+molName+"<br><br><button onclick='bondCheck(1)'>IONIC</button><br><button onclick='bondCheck(2)'>COVELANT (polar)</button><br><button onclick='bondCheck(3)'>COVELANT (non-polar)</button>";
			document.getElementById('molInfo').innerHTML = result;
		}else{
			dataLayer.push({'event': 'check.bond', 'event_id': answerKeys[document.getElementById('moleculeSelect').value] , 'event_value': 0  });
			var showBad = "That is incorrect - press continue<br><button onclick='doCont()'>Continue</button>";
			document.getElementById('molInfo').innerHTML = showBad;
		}
	}
}

function doCont(){
	document.getElementById('molInfo').innerHTML = molInfo;
	BackResetTrue = 0;
}

function bondCheck(ind){
	var thisBondType = parseInt(molBondingType[currentMol]);
	var thisBondInfo = "";

	if(thisBondType === 1){
		thisBondInfo = "IONIC";
	}
	if(thisBondType === 2){
		thisBondInfo = "COVALENT - polar";
	}
	if(thisBondType === 3){
		thisBondInfo = "COVALENT - non-polar";
	}	
	var result = "";
	if(ind === thisBondType){
		dataLayer.push({'event': 'check.bond_type', 'event_id': answerKeys[document.getElementById('moleculeSelect').value] , 'event_value': 1 });
		result = "Yes, that is correct. The bonding for "+molName+" is "+thisBondInfo+".<br><br>The next step is to build the bonding of the "+molName+" molecule. Please press continue<br><br><button onclick='buildDropTables()'>Continue</button>";
	}else{
		dataLayer.push({'event': 'check.bond_type', 'event_id': answerKeys[document.getElementById('moleculeSelect').value] , 'event_value': 0 });
		result = "No, that is no correct. In fact the bonding for "+molName+" is "+thisBondInfo+".<br><br>The next step is to build the bonding of the "+molName+" molecule. Please press continue<br><br><button onclick='buildDropTables()'>Continue</button>";
	}
	document.getElementById('molInfo').innerHTML = result;
}



function buildDropTables(){
	var loadString = "Loading";
	document.getElementById('thisMol').innerHTML = loadString;
	clearTableArea();
	var x = currentMol;
	var y = molArray[x].length;
	hiderow();
	for(var z = 0; z<y; z++){
		var rowKey = "tRow"+(z+7);
		var showRow = molArray[x][z];
		document.getElementById(rowKey).innerHTML = showRow;
		document.getElementById(rowKey).style.display = '';
	}
	document.getElementById('thisMol').innerHTML = molName;
}

function resetDropTables(){
	clearTableArea();
	var x = currentMol;
	var y = molArray[x].length;
	document.getElementById('thisMol').innerHTML = molName;
	//hiderow();
	for(var z = 0; z<y; z++){
		var rowKey = "tRow"+(z+7);
		var showRow = molArray[x][z];
		document.getElementById(rowKey).innerHTML = showRow;
		document.getElementById(rowKey).style.display = '';
	}
}

function clearTableArea(){
	for(var z = 0; z<10; z++){
		var rowKey = "tRow"+(z+7);
		var showRow = "";
		document.getElementById(rowKey).innerHTML = showRow;
		document.getElementById(rowKey).style.display = 'none';
	}
}

function hiderow(){
	var tr = "";
	for(var x = 1; x <=17; x++){
		tr = "tRow"+x;
		if( document.getElementById(tr).style.display=='none' ){
			document.getElementById(tr).style.display = '';
		}else{
			document.getElementById(tr).style.display = 'none';
		}
	}
}

function hidetherow(){
	document.getElementById('drag').style.display = "";
	document.getElementById('loadpage').style.display = 'none';
	document.getElementById('tRow2').style.display = 'none';
	document.getElementById('tRow4').style.display = 'none';
	document.getElementById('tRow7').style.display = 'none';
	document.getElementById('tRow8').style.display = 'none';
	document.getElementById('tRow9').style.display = 'none';
	document.getElementById('tRow10').style.display = 'none';
	document.getElementById('tRow11').style.display = 'none';
	document.getElementById('tRow12').style.display = 'none';
	document.getElementById('tRow13').style.display = 'none';
	document.getElementById('tRow14').style.display = 'none';
	document.getElementById('tRow15').style.display = 'none';
	document.getElementById('tRow16').style.display = 'none';
	document.getElementById('tRow17').style.display = 'none';
	document.getElementById('tRow18').style.display = 'none';
}

function checkDropResult(){
	createStatusTable();
	switch(currentMol){
			case 1:
				checkMOL1();
				break;
			case 2:
				checkMOL1();
				break;
			case 3:
				checkMOL2(0,36,0,0,43,43,0,0,36,0);
				break;	
			case 4:
				checkMOL1();
				break;	
			case 5:
				checkMOL3();
				break;	
			case 6:
				checkMOL2(50,0,50,50,43,43,50,50,0,50);
				break;		
			case 7:
				checkMOL1();
				break;	
			case 8:
				checkMOL4();
				break;				
	}
}

function checkMOL1(){
	var resultStr = "";
	var s1 = resultArray[3]+resultArray[4]+resultArray[14]+resultArray[24]+resultArray[33]+resultArray[34];
	var s2 = resultArray[6]+resultArray[7];
	var s3 = resultArray[18]+resultArray[26];
	var s4 = resultArray[36]+resultArray[37];
	var s5 = resultArray[16]+resultArray[25];
	
	if((s1 === 0) && (s2 === 36) && (s3 === 36) && (s4 === 36) && (s5 === 43)){
		bondSuccess();
	}else{
		resultStr = molName+": That is not the correct bonding for this molecule.";
		document.getElementById('thisMol').innerHTML = resultStr;
		
	}
	//alert(s1+" : " +s2+" : " +s3+" : " +s4+" : " +s5);
}

function checkMOL2(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10){

	//50,0,50,0,80,80,0,50,0,50
	var resultStr = "";
	var s1 = resultArray[3]+resultArray[4];
	var s2 = resultArray[6]+resultArray[7];
	var s3 = resultArray[9]+resultArray[10];
	var s4 = resultArray[14]+resultArray[23];
	var s5 = resultArray[16]+resultArray[24];
	var s6 = resultArray[18]+resultArray[25];
	var s7 = resultArray[20]+resultArray[26];
	var s8 = resultArray[30]+resultArray[31];
	var s9 = resultArray[33]+resultArray[34];
	var s10 = resultArray[36]+resultArray[37];	
	if((s1 === c1) && (s2 === c2) && (s3 === c3) && (s4 === c4) && (s5 === c5) && (s6 === c6) && (s7 === c7) && (s8 === c8) && (s9 === c9) && (s10 === c10)){
		bondSuccess();
	}else{
		resultStr = molName+": That is not the correct bonding for this molecule.";
		document.getElementById('thisMol').innerHTML = resultStr;
	}
	//alert(s1+" "+s2+" "+s3+" "+s4+" "+s5+" "+s6+" "+s7+" "+s8+" "+s9+" "+s10);
}

function checkMOL3(){
	var resultStr = "";
	var s1 = resultArray[6]+resultArray[7]+resultArray[17]+resultArray[28]+resultArray[19]+resultArray[29]+resultArray[36]+resultArray[37];
	var s2 = resultArray[42]+resultArray[43]+resultArray[47]+resultArray[56]+resultArray[53]+resultArray[59]+resultArray[63]+resultArray[64];
	var s3 = resultArray[69]+resultArray[70]+resultArray[77]+resultArray[88]+resultArray[79]+resultArray[89]+resultArray[99]+resultArray[100];
	var s4 = s1+s2+s3;
	
	var s5 = resultArray[39]+resultArray[40];
	var s6 = resultArray[49]+resultArray[57];
	var s7 = resultArray[51]+resultArray[58];
	var s8 = resultArray[66]+resultArray[67];
	
	if((s4 === 0) && (s5 === 43) && (s6 === 43) && (s7 === 43) && (s8 === 43)){
		bondSuccess();
	}else{
		resultStr = molName+": That is not the correct bonding for this molecule.";
		document.getElementById('thisMol').innerHTML = resultStr;
	}
}

function checkMOL4(){
	var resultStr = "";
	var s1 = resultArray[6]+resultArray[7]+resultArray[17]+resultArray[28]+resultArray[19]+resultArray[29]+resultArray[36]+resultArray[37];
	var s2 = resultArray[42]+resultArray[43]+resultArray[47]+resultArray[56]+resultArray[53]+resultArray[59]+resultArray[63]+resultArray[64];
	var s3 = resultArray[69]+resultArray[70]+resultArray[77]+resultArray[88]+resultArray[79]+resultArray[89]+resultArray[99]+resultArray[100];
	var s4 = s1+s2+s3;
	
	var s5 = resultArray[39]+resultArray[40];
	var s6 = resultArray[49]+resultArray[57];
	var s7 = resultArray[51]+resultArray[58];
	var s8 = resultArray[66]+resultArray[67];
	
	if((s4 === 432) && (s5 === 43) && (s6 === 43) && (s7 === 43) && (s8 === 43)){
		bondSuccess();
	}else{
		resultStr = molName+": That is not the correct bonding for this molecule.";
		document.getElementById('thisMol').innerHTML = resultStr;
	}
	//alert(s4+" "+s5+" "+s6+" "+s7+" "+s8);
}

function createStatusTable(){
	//alert("in status table function");
	for(var x=0;x<=200;x++){
		resultArray[x] = 0;
	}
	var cellContents = "";
	var discStr = "";
	var checkDisc = "";
	var scoreNum = 0;
	var dIND = 0;
	var dINDAdj = 1;
	var table = document.getElementById('table1');
	for (var r = 0, n = table.rows.length; r < n; r++) {
		for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
			//var tempContents = table.rows[r].cells[c].innerHTML
			//alert(dIND+" : "+tempContents);
			if(dIND>28){
				cellContents = table.rows[r].cells[c].innerHTML
				//alert("dINDAdj: "+dINDAdj+", dIND: "+dIND)
				//alert(cellContents)
				var idPos = parseInt(cellContents.indexOf('id="c'));

				discStr = cellContents.substring(idPos+4,idPos+7);
				checkDisc = discStr.substring(0,1);
				if(checkDisc === "c"){
					scoreNum = parseInt(discStr.substring(1,3));
					resultArray[dINDAdj] = scoreNum;
				}
				dINDAdj++;
			}
			dIND++;
		}
	}
}

function bondSuccess(){
	document.getElementById('tRow4').style.display = 'none';
	document.getElementById('tRow7').style.display = 'none';
	document.getElementById('tRow8').style.display = 'none';
	document.getElementById('tRow9').style.display = 'none';
	document.getElementById('tRow10').style.display = 'none';
	document.getElementById('tRow11').style.display = 'none';
	document.getElementById('tRow12').style.display = 'none';
	document.getElementById('tRow13').style.display = 'none';
	document.getElementById('tRow14').style.display = 'none';
	document.getElementById('tRow15').style.display = 'none';
	document.getElementById('tRow16').style.display = 'none';
	document.getElementById('tRow17').style.display = 'none';
	
	var bondResultStr = "<td colspan='6'><img id='bondingGIF' src='images/gifs/BondHydrogenChloride.gif' width='100%'></td><td colspan='6' class='message' id='bondingInfo'></td>";
	var bondInfo = bondDetail[currentMol];
	document.getElementById('tRow18').innerHTML = bondResultStr;
	document.getElementById('bondingGIF').src = bondGIFs[currentMol].src;
	document.getElementById('bondingInfo').innerHTML = bondInfo;
	document.getElementById('tRow18').style.display = '';

	
	//alert(bondInfo);

}

function returnToSelection(){
	dataLayer.push({'event': 'finish.lab', 'event_id': answerKeys[document.getElementById('moleculeSelect').value]});
	dataLayer.push({'event': 'restart.lab', 'event_id': answerKeys[document.getElementById('moleculeSelect').value]});

	BackResetTrue = 0;
	document.getElementById('molInfo').innerHTML = molDetail[currentMol];
	resetName();
	document.getElementById('tRow1').style.display = '';
	document.getElementById('tRow3').style.display = '';
	document.getElementById('tRow5').style.display = '';
	document.getElementById('tRow6').style.display = '';

	document.getElementById('tRow2').style.display = 'none';
	document.getElementById('tRow4').style.display = 'none';
	document.getElementById('tRow7').style.display = 'none';
	document.getElementById('tRow8').style.display = 'none';
	document.getElementById('tRow9').style.display = 'none';
	document.getElementById('tRow10').style.display = 'none';
	document.getElementById('tRow11').style.display = 'none';
	document.getElementById('tRow12').style.display = 'none';
	document.getElementById('tRow13').style.display = 'none';
	document.getElementById('tRow14').style.display = 'none';
	document.getElementById('tRow15').style.display = 'none';
	document.getElementById('tRow16').style.display = 'none';
	document.getElementById('tRow17').style.display = 'none';
	document.getElementById('tRow18').style.display = 'none';
}

function showDiagram(){
	window.open('Help_PeriodicTable.html','_blank');
}