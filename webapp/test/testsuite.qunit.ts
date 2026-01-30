import type {SuiteConfiguration} from "sap/ui/test/starter/config";
export default {
	name: "QUnit test suite for the UI5 Application: com.lcpg.sapui5ts",
	defaults: {
		page: "ui5://test-resources/com/lcpg/sapui5ts/Test.qunit.html?testsuite={suite}&test={name}",
		qunit: {
			version: 2
		},
		sinon: {
			version: 4
		},
		ui5: {
			language: "EN",
			theme: "sap_horizon"
		},
		coverage: {
			only: ["com/lcpg/sapui5ts/"],
			never: ["test-resources/com/lcpg/sapui5ts/"]
		},
		loader: {
			paths: {
				"com/lcpg/sapui5ts": "../"
			}
		}
	},
	tests: {
		"unit/unitTests": {
			title: "Unit tests for com.lcpg.sapui5ts"
		},
		"integration/opaTests": {
			title: "Integration tests for com.lcpg.sapui5ts"
		}
	}
} satisfies SuiteConfiguration;