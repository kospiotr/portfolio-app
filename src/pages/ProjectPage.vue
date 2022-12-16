<template>
  <q-page class="flex column fit q-pa-md">
    <q-card class="fit" style="">
      <q-tabs
        v-model="tab"
        class="bg-primary text-white"
        align="right"
        narrow-indicator
        @update:model-value="tabChanged"
        ><div class="q-px-md">Project</div>
        <q-space />
        <q-tab name="general" label="General" />
        <q-tab name="delivery" label="Delivery" />
        <q-tab name="solution" label="Solution" />
        <q-tab name="caseStudy" label="Case study" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab">
        <q-tab-panel name="general">
          <div class="row q-col-gutter-md">
            <q-input
              v-model="item.general.title"
              label="Title"
              outlined
              dense
              class="col-12 col-md"
            />

            <q-select
              v-model="item.general.kimbleEngagements"
              multiple
              outlined
              dense
              label="Kimble Engagements"
              :options="fields.clientUnit.options"
              class="col-12 col-md"
            />
          </div>
          <div class="row q-col-gutter-x-md q-pt-md">
            <AppFieldSelect
              :field="fields.clientUnit"
              v-model="item.general.clientUnit"
              class="col-12 col-md"
            />
            <AppFieldSelect
              :field="fields.country"
              v-model="item.general.country"
              class="col-12 col-md"
            />
            <AppFieldDate label="Start Date" class="col-12 col-md" />
            <AppFieldDate label="End Date" class="col-12 col-md" />
            <AppFieldSelect
              :field="fields.status"
              v-model="item.general.status"
              class="col-12 col-md"
            />
          </div>
          <div class="row q-col-gutter-x-md q-pt-md">
            <AppFieldSelect
              :field="fields.deliveryManager"
              v-model="item.general.deliveryManager"
              class="col-12 col-md"
            />

            <AppFieldSelect
              :field="fields.projectManager"
              v-model="item.general.projectManager"
              class="col-12 col-md"
            />

            <AppFieldSelect
              :field="fields.projectHead"
              v-model="item.general.projectHead"
              class="col-12 col-md"
            />
          </div>
          <q-select
            v-model="item.solution.clientUnit"
            :options="fields.clientUnit.options"
            multiple
            outlined
            dense
            label="Tags"
            class="col-12 col-md q-pt-md"
          />
          <AppFieldEditor label="Summary" class="col-12 col-md q-pt-md" />
        </q-tab-panel>

        <q-tab-panel name="delivery">
          <div class="row q-col-gutter-x-md">
            <AppFieldEditor label="Business Context" class="col-12 col-md" />
            <AppFieldEditor label="The Challenge" class="col-12 col-md" />
          </div>
          <div class="row q-col-gutter-x-md">
            <AppFieldEditor
              label="The Engagement (Deliverables & Milestones)"
              class="col-12 col-md"
            />
          </div>
          <div class="row q-col-gutter-x-md">
            <AppFieldEditor label="The Benefit" class="col-12 col-md" />
          </div>
          <div class="row q-col-gutter-x-md">
            <AppFieldEditor
              label="Notes / Action Points"
              class="col-12 col-md"
            />
            <AppFieldEditor label="Lessons Learned" class="col-12 col-md" />
          </div>
        </q-tab-panel>

        <q-tab-panel name="solution">
          <div class="row q-col-gutter-x-md">
            <AppFieldEditor
              label="Solution Description"
              class="col-12 col-md"
            />
          </div>
          <div class="solution-survey row items-start">
            <div class="category">Business Consulting</div>
            <AppFieldSelects
              :field="fields.businessConsulting.competencies"
              v-model="item.solution.businessConsulting.competencies"
            />
            <AppFieldSelects
              :field="fields.businessConsulting.coreBanking"
              v-model="item.solution.businessConsulting.coreBanking"
            />
            <AppFieldSelects
              :field="fields.businessConsulting.industry"
              v-model="item.solution.businessConsulting.industry"
            />
            <AppFieldSelects
              :field="fields.businessConsulting.insurance"
              v-model="item.solution.businessConsulting.insurance"
            />
            <AppFieldSelects
              :field="fields.businessConsulting.riskLegalRegulatoryCompliance"
              v-model="
                item.solution.businessConsulting.riskLegalRegulatoryCompliance
              "
            />
            <AppFieldSelects
              :field="fields.businessConsulting.tradeAndAccountancy"
              v-model="item.solution.businessConsulting.tradeAndAccountancy"
            />
            <div class="category">Process Automation</div>
            <AppFieldSelects
              :field="fields.processAutomation.bpm"
              v-model="item.solution.processAutomation.bpm"
            />
            <AppFieldSelects
              :field="fields.processAutomation.cep"
              v-model="item.solution.processAutomation.cep"
            />
            <AppFieldSelects
              :field="fields.processAutomation.rpa"
              v-model="item.solution.processAutomation.rpa"
            />

            <div class="category">Architecture</div>
            <AppFieldSelects
              :field="fields.architecture.apiGovernance"
              v-model="item.solution.architecture.apiGovernance"
            />

            <div class="category">Testing</div>
            <AppFieldSelects
              :field="fields.testing.testing"
              v-model="item.solution.testing.testing"
            />

            <div class="category">XD</div>
            <AppFieldSelects
              :field="fields.xd.interactionDesign"
              v-model="item.solution.xd.interactionDesign"
            />
            <AppFieldSelects
              :field="fields.xd.userResearch"
              v-model="item.solution.xd.userResearch"
            />
            <AppFieldSelects
              :field="fields.xd.visualDesign"
              v-model="item.solution.xd.visualDesign"
            />

            <div class="category">Artificial Intelligence</div>
            <AppFieldSelects
              :field="fields.ai.dataScience"
              v-model="item.solution.ai.dataScience"
            />

            <div class="category">CRM</div>
            <AppFieldSelects
              :field="fields.crm.salesforce"
              v-model="item.solution.crm.salesforce"
            />
            <AppFieldSelects
              :field="fields.crm.salesforceMarketingCloud"
              v-model="item.solution.crm.salesforceMarketingCloud"
            />

            <div class="category">Internet of Things</div>
            <AppFieldSelects
              :field="fields.iot.internetOfThings"
              v-model="item.solution.iot.internetOfThings"
            />

            <div class="category">Industrial Engineering</div>
            <AppFieldSelects
              :field="fields.ie.electricalEngineering"
              v-model="item.solution.ie.electricalEngineering"
            />
            <AppFieldSelects
              :field="fields.ie.fieldbusSystems"
              v-model="item.solution.ie.fieldbusSystems"
            />
            <AppFieldSelects
              :field="fields.ie.industrialInternetOfThings"
              v-model="item.solution.ie.industrialInternetOfThings"
            />
            <AppFieldSelects
              :field="fields.ie.pLCNC"
              v-model="item.solution.ie.pLCNC"
            />

            <div class="category">Cloud</div>
            <AppFieldSelects
              :field="fields.cloud.ownerOfCloudService"
              v-model="item.solution.cloud.ownerOfCloudService"
            />
            <AppFieldSelects
              :field="fields.cloud.serviceDelivery"
              v-model="item.solution.cloud.serviceDelivery"
            />
            <AppFieldSelects
              :field="fields.cloud.dataProcessing"
              v-model="item.solution.cloud.dataProcessing"
            />
            <AppFieldSelects
              :field="fields.cloud.amazonWebServices"
              v-model="item.solution.cloud.amazonWebServices"
            />
            <AppFieldSelects
              :field="fields.cloud.cloudOps"
              v-model="item.solution.cloud.cloudOps"
            />
            <AppFieldSelects
              :field="fields.cloud.googleCloudPlatform"
              v-model="item.solution.cloud.googleCloudPlatform"
            />
            <AppFieldSelects
              :field="fields.cloud.microsoftAzure"
              v-model="item.solution.cloud.microsoftAzure"
            />
            <AppFieldSelects
              :field="fields.cloud.others"
              v-model="item.solution.cloud.others"
            />

            <div class="category">Backend</div>
            <AppFieldSelects
              :field="fields.backend.highPerformance"
              v-model="item.solution.backend.highPerformance"
            />
            <AppFieldSelects
              :field="fields.backend.middleware"
              v-model="item.solution.backend.middleware"
            />
            <AppFieldSelects
              :field="fields.backend.scriptingLanguages"
              v-model="item.solution.backend.scriptingLanguages"
            />
            <AppFieldSelects
              :field="fields.backend.services"
              v-model="item.solution.backend.services"
            />
            <AppFieldSelects
              :field="fields.backend.unitTesting"
              v-model="item.solution.backend.unitTesting"
            />

            <div class="category">DevOps</div>
            <AppFieldSelects
              :field="fields.devOps.automatedTesting"
              v-model="item.solution.devOps.automatedTesting"
            />
            <AppFieldSelects
              :field="fields.devOps.continuousDelivery"
              v-model="item.solution.devOps.continuousDelivery"
            />
            <AppFieldSelects
              :field="fields.devOps.infrastructureAsCode"
              v-model="item.solution.devOps.infrastructureAsCode"
            />
            <AppFieldSelects
              :field="fields.devOps.sDLC"
              v-model="item.solution.devOps.sDLC"
            />
            <AppFieldSelects
              :field="fields.devOps.sysOps"
              v-model="item.solution.devOps.sysOps"
            />

            <div class="category">Data</div>
            <AppFieldSelects
              :field="fields.data.bI"
              v-model="item.solution.data.bI"
            />
            <AppFieldSelects
              :field="fields.data.bigDataStreaming"
              v-model="item.solution.data.bigDataStreaming"
            />
            <AppFieldSelects
              :field="fields.data.cache"
              v-model="item.solution.data.cache"
            />
            <AppFieldSelects
              :field="fields.data.dataAnalysisAndModelling"
              v-model="item.solution.data.dataAnalysisAndModelling"
            />
            <AppFieldSelects
              :field="fields.data.database"
              v-model="item.solution.data.database"
            />
            <div class="category">Mainframe</div>
            <AppFieldSelects
              :field="fields.mainframe.development"
              v-model="item.solution.mainframe.development"
            />
            <AppFieldSelects
              :field="fields.mainframe.problemDetermination"
              v-model="item.solution.mainframe.problemDetermination"
            />
            <div class="category">Environment</div>
            <AppFieldSelects
              :field="fields.environment.development"
              v-model="item.solution.environment.development"
            />
            <div class="category">Frontend</div>
            <AppFieldSelects
              :field="fields.frontEnd.frontend"
              v-model="item.solution.frontEnd.frontend"
            />
            <AppFieldSelects
              :field="fields.frontEnd.lowCode"
              v-model="item.solution.frontEnd.lowCode"
            />
            <AppFieldSelects
              :field="fields.frontEnd.unitTesting"
              v-model="item.solution.frontEnd.unitTesting"
            />
            <div class="category">Distributed Ledger Technologies</div>
            <AppFieldSelects
              :field="fields.dlt.blockchain"
              v-model="item.solution.dlt.blockchain"
            />
            <div class="category">Microsoft</div>
            <AppFieldSelects
              :field="fields.microsoft.microsoft"
              v-model="item.solution.microsoft.microsoft"
            />
            <div class="category">Mobile</div>
            <AppFieldSelects
              :field="fields.mobile.hybrid"
              v-model="item.solution.mobile.hybrid"
            />
            <AppFieldSelects
              :field="fields.mobile.native"
              v-model="item.solution.mobile.native"
            />
          </div>
        </q-tab-panel>

        <q-tab-panel name="caseStudy">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="save" color="accent" @click="onSave()" />
    </q-page-sticky>
  </q-page>
</template>

<style scoped lang="sass">

.solution-survey :deep(.q-field)
  margin: 1px
  padding: 4px 8px

@media (max-width: $breakpoint-md-min)
  .solution-survey :deep(.q-field)
    width: 100%

@media (min-width: $breakpoint-md-min)
  .solution-survey :deep(.q-field)
    width: 49%

@media (min-width: $breakpoint-lg-min)
  .solution-survey :deep(.q-field)
    width: 33%
.category
  flex: 1 0 100% !important
  width: 0 !important
  padding-top: 20px
  font-size: 20px
</style>

<script lang="ts" setup>
import { useStore } from 'stores/projects';
import {
  doc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { db } from 'boot/firebase';
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import AppFieldDate from 'components/AppFieldDate.vue';
import AppFieldEditor from 'components/AppFieldEditor.vue';
import AppFieldSelect from 'components/AppFieldSelect.vue';
import AppFieldSelects from 'components/AppFieldSelects.vue';
import { projectFields } from 'components/ProjectFields';

const route = useRoute();
const router = useRouter();
const store = useStore();

const fields = projectFields();
const tab = ref(route.query.tab || 'general');
const tabChanged = (tab) => {
  router.replace({ query: Object.assign({}, route.query, { tab: tab }) });
};
let item = ref({
  general: {},
  delivery: {},
  solution: {
    businessConsulting: {},
    processAutomation: {},
    architecture: {},
    testing: {},
    xd: {},
    ai: {},
    crm: {},
    iot: {},
    ie: {},
    cloud: {},
    backend: {},
    devOps: {},
    data: {},
    mainframe: {},
    environment: {},
    frontEnd: {},
    dlt: {},
    microsoft: {},
    mobile: {},
  },
});

const loadItem = async () => {
  console.log(route.query.id);
  const docRef = doc(db, 'project_old', route.query.id);

  const docSnap = await getDoc(docRef);
  item.value = docSnap.data();
  console.log(docSnap.data());
};

const onSave = () => {
  console.log('Item: ', item);
};
</script>
