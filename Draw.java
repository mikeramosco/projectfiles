/*
 * File: Draw.java
 * 
 * This file allows user to draw onto canvas using different colors and thickness sizes
 */

import acm.graphics.*;
import acm.program.*;
import java.awt.event.*;
import java.awt.*;

public class Draw extends GraphicsProgram {
	
/* The height of the toolbar */
	private static final int TOOLBAR_HEIGHT = 20;

/* the height and length of each color box */
	private static final int COLOR_BOX_LENGTH = 13;
	
/* the seperation in between each box */
	private static final int COLOR_BOX_SEP = 5;
	
/* the initialize method */
	public void init() {
		addMouseListeners();
	}
	
/* the run method */
	public void run() {
		setup();
	}
	
/* sets up the program */
	private void setup() {
		color = Color.BLACK;
		thickness = 5;
		toolbar();
		changeColor();
		clearAll();
		changeThickness();
	}
	
/* sets up the toolbar */
	private void toolbar() {
		toolbar = new GRect(getWidth(), getHeight() + TOOLBAR_HEIGHT);
		toolbar.setFilled(true);
		toolbar.setColor(Color.LIGHT_GRAY);
		add(toolbar, 0, -getHeight());
	}
	
/* sets up the boxes for each color; will allow user to change pen color */
	private void changeColor() {
		makeRed();
		makeBlue();
		makeBlack();
		makeYellow();
		makeGreen();
		makeOrange();
		makePink();
		makeGray();
		makeLightGray();
		makeWhite();
	}
	
/* sets black color box */
	private void makeBlack() {
		blackBox = new GRect(COLOR_BOX_LENGTH, COLOR_BOX_LENGTH);
		blackBox.setFilled(true);
		blackBox.setFillColor(Color.BLACK);
		add(blackBox, COLOR_BOX_SEP + (COLOR_BOX_SEP + COLOR_BOX_LENGTH) * 0, (TOOLBAR_HEIGHT - blackBox.getHeight()) / 2);
	}
	
/* sets blue color box */
	private void makeBlue() {
		blueBox = new GRect(COLOR_BOX_LENGTH, COLOR_BOX_LENGTH);
		blueBox.setFilled(true);
		blueBox.setFillColor(Color.BLUE);
		add(blueBox, COLOR_BOX_SEP + (COLOR_BOX_SEP + COLOR_BOX_LENGTH) * 1, (TOOLBAR_HEIGHT - blueBox.getHeight()) / 2);
	}

/* sets red color box */
	private void makeRed() {
		redBox = new GRect(COLOR_BOX_LENGTH, COLOR_BOX_LENGTH);
		redBox.setFilled(true);
		redBox.setFillColor(Color.RED);
		add(redBox, COLOR_BOX_SEP + (COLOR_BOX_SEP + COLOR_BOX_LENGTH) * 2, (TOOLBAR_HEIGHT - redBox.getHeight()) / 2);
	}
	
/* sets yellow color box */
	private void makeYellow() {
		yellowBox = new GRect(COLOR_BOX_LENGTH, COLOR_BOX_LENGTH);
		yellowBox.setFilled(true);
		yellowBox.setFillColor(Color.YELLOW);
		add(yellowBox, COLOR_BOX_SEP + (COLOR_BOX_SEP + COLOR_BOX_LENGTH) * 3, (TOOLBAR_HEIGHT - yellowBox.getHeight()) / 2);
	}
	
/* sets green color box */
	private void makeGreen() {
		greenBox = new GRect(COLOR_BOX_LENGTH, COLOR_BOX_LENGTH);
		greenBox.setFilled(true);
		greenBox.setFillColor(Color.GREEN);
		add(greenBox, COLOR_BOX_SEP + (COLOR_BOX_SEP + COLOR_BOX_LENGTH) * 4, (TOOLBAR_HEIGHT - greenBox.getHeight()) / 2);
	}
	
/* sets orange color box */
	private void makeOrange() {
		orangeBox = new GRect(COLOR_BOX_LENGTH, COLOR_BOX_LENGTH);
		orangeBox.setFilled(true);
		orangeBox.setFillColor(Color.ORANGE);
		add(orangeBox, COLOR_BOX_SEP + (COLOR_BOX_SEP + COLOR_BOX_LENGTH) * 5, (TOOLBAR_HEIGHT - orangeBox.getHeight()) / 2);
	}

/* sets pink color box */
	private void makePink() {
		pinkBox = new GRect(COLOR_BOX_LENGTH, COLOR_BOX_LENGTH);
		pinkBox.setFilled(true);
		pinkBox.setFillColor(Color.PINK);
		add(pinkBox, COLOR_BOX_SEP + (COLOR_BOX_SEP + COLOR_BOX_LENGTH) * 6, (TOOLBAR_HEIGHT - pinkBox.getHeight()) / 2);
	}
	
/* sets gray color box */
	private void makeGray() {
		grayBox = new GRect(COLOR_BOX_LENGTH, COLOR_BOX_LENGTH);
		grayBox.setFilled(true);
		grayBox.setFillColor(Color.GRAY);
		add(grayBox, COLOR_BOX_SEP + (COLOR_BOX_SEP + COLOR_BOX_LENGTH) * 7, (TOOLBAR_HEIGHT - grayBox.getHeight()) / 2);
	}
	
/* sets light gray color box */
	private void makeLightGray() {
		lightGrayBox = new GRect(COLOR_BOX_LENGTH, COLOR_BOX_LENGTH);
		lightGrayBox.setFilled(true);
		lightGrayBox.setFillColor(Color.LIGHT_GRAY);
		add(lightGrayBox, COLOR_BOX_SEP + (COLOR_BOX_SEP + COLOR_BOX_LENGTH) * 8, (TOOLBAR_HEIGHT - lightGrayBox.getHeight()) / 2);
	}
	
/* sets white color box */
	private void makeWhite() {
		whiteBox = new GRect(COLOR_BOX_LENGTH, COLOR_BOX_LENGTH);
		whiteBox.setFilled(true);
		whiteBox.setFillColor(Color.WHITE);
		add(whiteBox, COLOR_BOX_SEP + (COLOR_BOX_SEP + COLOR_BOX_LENGTH) * 9, (TOOLBAR_HEIGHT - whiteBox.getHeight()) / 2);
	}
	
/* sets clear all label, which will allow user to clear canvas */
	private void clearAll() {
		clearAll = new GCompound();
		GLabel clear = new GLabel("RESET");
		clear.setFont("ComicSans-10");
		GRect box = new GRect(clear.getWidth() + 5, COLOR_BOX_LENGTH);
		box.setFilled(true);
		box.setFillColor(Color.WHITE);
		clearAll.add(box, 0, 0);
		clearAll.add(clear, (box.getWidth() - clear.getWidth()) / 2, (box.getHeight() + clear.getAscent()) / 2);
		add(clearAll, COLOR_BOX_SEP + (COLOR_BOX_SEP + COLOR_BOX_LENGTH) * 11, (TOOLBAR_HEIGHT - box.getHeight()) / 2);
	}
	
/* allows user to change the thickness of pen */
	private void changeThickness() {
		thicknessLabel();
		makeThinner();
		makeNormal();
		makeThicker();
	}
	
/* sets thickness label */
	private void thicknessLabel() {
		thicknessLabel = new GLabel("THICKNESS: " + thickness);
		thicknessLabel.setFont("ComicSans-10");
		add(thicknessLabel, clearAll.getX() + clearAll.getWidth() * 2 + COLOR_BOX_SEP, (TOOLBAR_HEIGHT + thicknessLabel.getAscent()) / 2);
	}
	
/* sets "THINNER" label, and will set a thinner thickness */
	private void makeThinner() {
		thinnerLabel = new GCompound();
		GLabel clear = new GLabel("THINNER");
		clear.setFont("ComicSans-10");
		GRect box = new GRect(clear.getWidth() + 5, COLOR_BOX_LENGTH);
		box.setFilled(true);
		box.setFillColor(Color.WHITE);
		thinnerLabel.add(box, 0, 0);
		thinnerLabel.add(clear, (box.getWidth() - clear.getWidth()) / 2, (box.getHeight() + clear.getAscent()) / 2);
		add(thinnerLabel, thicknessLabel.getX() + thicknessLabel.getWidth() + COLOR_BOX_SEP * 3, (TOOLBAR_HEIGHT - box.getHeight()) / 2);
	}
	
/* sets "THICKER" label, and will set a thicker thickness */
	private void makeThicker() {
		thickerLabel = new GCompound();
		GLabel clear = new GLabel("THICKER");
		clear.setFont("ComicSans-10");
		GRect box = new GRect(clear.getWidth() + 5, COLOR_BOX_LENGTH);
		box.setFilled(true);
		box.setFillColor(Color.WHITE);
		thickerLabel.add(box, 0, 0);
		thickerLabel.add(clear, (box.getWidth() - clear.getWidth()) / 2, (box.getHeight() + clear.getAscent()) / 2);
		add(thickerLabel, normalLabel.getX() + normalLabel.getWidth() + COLOR_BOX_SEP, (TOOLBAR_HEIGHT - box.getHeight()) / 2);
	}
	
/* sets "NORMAL" label, and will set to the default thickness */
	private void makeNormal() {
		normalLabel = new GCompound();
		GLabel clear = new GLabel("NORMAL");
		clear.setFont("ComicSans-10");
		GRect box = new GRect(clear.getWidth() + 5, COLOR_BOX_LENGTH);
		box.setFilled(true);
		box.setFillColor(Color.WHITE);
		normalLabel.add(box, 0, 0);
		normalLabel.add(clear, (box.getWidth() - clear.getWidth()) / 2, (box.getHeight() + clear.getAscent()) / 2);
		add(normalLabel, thinnerLabel.getX() + thinnerLabel.getWidth() + COLOR_BOX_SEP, (TOOLBAR_HEIGHT - box.getHeight()) / 2);
	}
	
/* checks what is clicked, then performs the action accordingly */
	public void mousePressed(MouseEvent e) {
		clicked = new GPoint(e.getPoint());
		gobj = getElementAt(clicked);
		if (gobj == redBox) {
			color = Color.RED;
		} else if (gobj == blueBox) {
			color = Color.BLUE;
		} else if (gobj == blackBox) {
			color = Color.BLACK;
		} else if (gobj == yellowBox) {
			color = Color.YELLOW;
		} else if (gobj == greenBox) {
			color = Color.GREEN;
		} else if (gobj == orangeBox) {
			color = Color.ORANGE;
		} else if (gobj == pinkBox) {
			color = Color.PINK;
		} else if (gobj == grayBox) {
			color = Color.GRAY;
		} else if (gobj == lightGrayBox) {
			color = Color.LIGHT_GRAY;
		} else if (gobj == whiteBox) {
			color = Color.WHITE;
		} else if (gobj == clearAll) {
			removeAll();
			setup();
		} else if (gobj == thinnerLabel) {
			if(thickness > 1) { //will prevent thickness from going under 1
				thickness--;
			}
			remove(thicknessLabel);
			thicknessLabel();
		} else if (gobj == normalLabel) {
			thickness = 5;
			remove(thicknessLabel);
			thicknessLabel();
		} else if (gobj == thickerLabel) {
			if(thickness < 96) { //will prevent thickness from going over 100
				thickness += 5;
			}
			remove(thicknessLabel);
			thicknessLabel();
		} else if (gobj != toolbar && gobj != thicknessLabel) {
			draw(e);
		}
	}
	
/* allows user to draw on canvas */
	public void mouseDragged(MouseEvent e) {
		GPoint dragged = new GPoint(e.getPoint());
		GObject gobj2 = getElementAt(dragged);
		if(gobj != thicknessLabel && gobj != thinnerLabel && gobj != normalLabel && gobj != thickerLabel 
				&& gobj != toolbar && gobj != clearAll && gobj != blueBox && gobj != redBox && gobj != blackBox 
				&& gobj != whiteBox && gobj != yellowBox && gobj != greenBox && gobj != orangeBox && gobj != pinkBox 
				&& gobj != grayBox && gobj != lightGrayBox
				
				&& gobj2 != thicknessLabel && gobj2 != thinnerLabel && gobj2 != normalLabel && gobj2 != thickerLabel 
				&& gobj2 != toolbar && gobj2 != clearAll && gobj2 != blueBox && gobj2 != redBox && gobj2 != blackBox 
				&& gobj2 != whiteBox && gobj2 != yellowBox && gobj2 != greenBox && gobj2 != orangeBox && gobj2 != pinkBox 
				&& gobj2 != grayBox && gobj2 != lightGrayBox) {
			draw(e);
		}
	}
	
/* adds a circle every moment mouse is dragged */
	private void draw(MouseEvent e) {
		GOval circle = new GOval(thickness, thickness);
		circle.setFilled(true);
		circle.setColor(color);
		double x = e.getX() - circle.getWidth() / 2;
		double y = e.getY() - circle.getHeight() / 2;
		add(circle, x, y);
	}
	
/* private instance variables */
	private int thickness;
	private GPoint clicked;
	private GObject gobj;
	private Color color;
	private GRect redBox, blueBox, blackBox, yellowBox, greenBox, orangeBox, pinkBox, grayBox, lightGrayBox, whiteBox, toolbar;
	private GCompound clearAll, thinnerLabel, thickerLabel, normalLabel;
	private GLabel thicknessLabel;
}
