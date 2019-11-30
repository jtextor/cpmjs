/* 	================= DESCRIPTION ===================== */
/* This text is printed on the HTML page. */
/* START DESCRIPTION Do not remove this line */
Cell moving towards a target point.
/* END DESCRIPTION Do not remove this line */

/* 	================= DECLARE CUSTOM METHODS ===================== */
/* 	If no custom methods are defined, the drawing/initialisation/output 
	functions of the CPM.Simulation class are used. */

// Are any custom methods defined here?
Custom-methods: true

/* START METHODS OBJECT Do not remove this line */
/* 	The following functions are defined below and will be added to
	the simulation object. If Custom-methods above is set to false,
	this object is ignored and not used in the html/node files. */
let custommethods = {
	initializeGrid : initializeGrid
}
/* END METHODS OBJECT Do not remove this line */

/* ================= ADD MORE CONSTRAINTS ===================== */

/* Example of how to add a constraint. 
let pconstraint = new CPM.PersistenceConstraint( 
	{
		// PreferredDirectionConstraint parameters
		LAMBDA_DIR: [0,100,100], 				// PreferredDirectionConstraint importance per ck
		PERSIST: [0,.7,0.2]						// Weight of the persistent direction in the
												// computation of the new direction per cellkind
	} 
)
sim.C.add( pconstraint ) */
/* START ADDCONSTRAINTS Do not remove this line */
	let Cdir = new CPM.AttractionPointConstraint({
		LAMBDA_ATTRACTIONPOINT : [0,100],
		ATTRACTIONPOINT : [[0,0], [sim.C.extents[0]/2,sim.C.extents[1]/2] ] 
	})

	sim.C.add( Cdir )
/* END ADDCONSTRAINTS Do not remove this line */



/* ================= WRITE CUSTOM METHODS ===================== */

/* START METHODS DEFINITION Do not remove this line */

/* The following custom methods will be added to the simulation object*/
function initializeGrid(){
	
		// add the initializer if not already there
		if( !this.helpClasses["gm"] ){ this.addGridManipulator() }
	
		for( let i = 0 ; i < Math.PI*2 ; i += 0.4 ){
			this.gm.seedCellAt( 1, 
			[Math.round(this.C.extents[0]/2+this.C.extents[1]/3*Math.sin(i)),
			Math.round(this.C.extents[0]/2+this.C.extents[0]/3*Math.cos(i))] )
		}
		
}

/* END METHODS DEFINITION Do not remove this line */



/* ================= CONFIGURATION ===================== */

/* Do not remove this line: START CONFIGURATION */
/*	----------------------------------
	CONFIGURATION SETTINGS
	----------------------------------
*/
let config = {

	// Grid settings
	ndim : 2,
	field_size : [200,200],
	
	// CPM parameters and configuration
	conf : {
		// Basic CPM parameters
		torus : [true,true],				// Should the grid have linked borders?
		seed : 2,							// Seed for random number generation.
		T : 20,								// CPM temperature
		
		// Constraint parameters. 
		// Mostly these have the format of an array in which each element specifies the
		// parameter value for one of the cellkinds on the grid.
		// First value is always cellkind 0 (the background) and is often not used.

		
		// Adhesion parameters:
		J : [ 
		 	[0,20],
			[20,1000]
		],
		
		// VolumeConstraint parameters
		LAMBDA_V : [0,50],				// VolumeConstraint importance per cellkind
		V : [0,152]						// Target volume of each cellkind
		
		
	},
	
	// Simulation setup and configuration: this controls stuff like grid initialization,
	// runtime, and what the output should look like.
	simsettings : {
	
		// Cells on the grid
		NRCELLS : [3,0],					// Number of cells to seed for all
											// non-background cellkinds.
		// Runtime etc
		BURNIN : 20,
		RUNTIME : 1000,
		RUNTIME_BROWSER : "Inf",
		
		// Visualization
		CANVASCOLOR : "EEEEEE",
		CELLCOLOR : ["000000"],
		SHOWBORDERS : [true],				// Should cellborders be displayed?
		BORDERCOL : ["666666"],
		zoom : 2,							// zoom in on canvas with this factor.
		
		// Output images
		SAVEIMG : true,						// Should a png image of the grid be saved
											// during the simulation?
		IMGFRAMERATE : 1,					// If so, do this every <IMGFRAMERATE> MCS.
		SAVEPATH : "output/img/DirectedMotionTargetPoint",	// ... And save the image in this folder.
		EXPNAME : "DirectedMotionTargetPoint",					// Used for the filename of output images.
		
		// Output stats etc
		STATSOUT : { browser: false, node: true }, // Should stats be computed?
		LOGRATE : 10							// Output stats every <LOGRATE> MCS.

	}
}
/*	---------------------------------- */
/* Do not remove this line: END CONFIGURATION */