<!--
import { setTimeout } from 'timers';
 * @Author: your name
 * @Date: 2020-05-27 18:43:25
 * @LastEditTime: 2020-05-27 18:44:34
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \smart_space_admin\src\views\dashboard\index.vue
-->
<template>
  <div ref="main" class="dashboard-container">
    <!-- 查询 -->
    <div ref="search" class="search-wrap">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-row>
        <el-form-item label="">
          <el-input
            v-model="formSearch.orderNum"
            placeholder="请输入订单编号"
          />
        </el-form-item>
        <el-form-item label="">
          <el-select
            v-model="formSearch.farmName"
            placeholder="养殖场名称"
            filterable
          >
            <el-option
              v-for="(item, index) in farmNameList"
              :key="index"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="formSearch.shipper" placeholder="请输入货主名称" />
        </el-form-item>
        <el-form-item label="">
          <el-select
            v-model="formSearch.wholesaler"
            placeholder="所属批发商"
            filterable
          >
            <el-option
              v-for="(item, index) in wholesalerList"
              :key="index"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="showSearch = !showSearch">{{showSearch?"收起":"展开"}}<i :class="showSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></el-button>
          <el-button
            v-has="'ordersMana:query'"
            type="primary"
            icon="el-icon-search"
            @click="submitForm('formSearch')"
          >查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh"
            plain
            @click="resetForm('formSearch')"
          >重置</el-button>
        </el-form-item>
        </el-row>
        <el-form-item label="" v-show="showSearch">
          <el-date-picker
            v-model="formSearch.enterTime"
            type="daterange"
            format="yyyy - MM - dd "
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="进厂开始日期"
            end-placeholder="进厂结束日期"
          />
        </el-form-item>
        <el-form-item label="" v-show="showSearch">
          <el-select v-model="formSearch.orderStatus" placeholder="订单状态">
            <el-option label="新订单" value="1" />
            <el-option label="提货中" value="2" />
            <el-option label="提货完成" value="3" />
            <el-option label="准入检疫完成" value="4" />
            <el-option label="交易完成" value="5" />
            <el-option label="准宰检疫完成" value="6" />
            <el-option label="准出检疫完成" value="7" />
            <el-option label="配送中" value="8" />
            <el-option label="订单完成" value="9" />
          </el-select>
        </el-form-item>
        <el-form-item label="" v-show="showSearch">
          <el-select
            v-model="formSearch.quarantineStatus"
            placeholder="检疫状态"
          >
            <el-option label="准入检疫-等待" value="1" />
            <el-option label="准入检疫-通过" value="2" />
            <el-option label="准入检疫-异常" value="3" />
            <el-option label="准宰检疫-等待" value="4" />
            <el-option label="准宰检疫-通过" value="5" />
            <el-option label="准宰检疫-异常" value="6" />
            <el-option label="准出检疫-等待" value="7" />
            <el-option label="准出检疫-通过" value="8" />
            <el-option label="准出检疫-异常" value="9" />
          </el-select>
        </el-form-item>
        <el-form-item label="" v-show="showSearch">
          <el-select v-model="formSearch.dispathStatus" placeholder="调度状态">
            <el-option label="提货未调度" value="1" />
            <el-option label="提货已调度" value="2" />
            <el-option label="配送未调度" value="3" />
            <el-option label="配送已调度" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="" v-show="showSearch">
          <el-select
            v-model="formSearch.transportationStatus"
            placeholder="运输状态"
          >
            <el-option label="新提货单" value="1" />
            <el-option label="准备提货" value="2" />
            <el-option label="提货中" value="3" />
            <el-option label="提货完成" value="4" />
            <el-option label="等待配送" value="5" />
            <el-option label="新送货单" value="6" />
            <el-option label="准备送货" value="7" />
            <el-option label="送货中" value="8" />
            <el-option label="送货完成" value="9" />
          </el-select>
        </el-form-item>
        <el-form-item label="" v-show="showSearch">
          <el-input
            v-model="formSearch.pickupOddNum"
            placeholder="请输入提货单号"
          />
        </el-form-item>
        <el-form-item label="" v-show="showSearch">
          <el-input
            v-model="formSearch.pickupPlateNumbers"
            placeholder="请输入提货车牌号"
          />
        </el-form-item>

        <el-form-item label="" v-show="showSearch">
          <el-select
            v-model="formSearch.pickupDriver"
            placeholder="提货司机"
            filterable
          >
            <el-option
              v-for="(item, index) in driverList"
              :key="index"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="" v-show="showSearch">
          <el-input
            v-model="formSearch.pickupDriverPhone"
            placeholder="请输入司机联系方式"
          />
        </el-form-item>
        <el-form-item label="" v-show="showSearch">
          <el-select v-model="formSearch.branchId" filterable :disabled="isshowBtn!=='0'" placeholder="请选择网点机构" @change="changeBranch">
            <el-option
              v-for="item in branchList"
              :key="item.id"
              :label="item.branchName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>        
      </el-form>
      <div class="line-s" />
    </div>
    <!-- 列表操作 -->
    <div ref="action" class="action-wrap">
      <div>
        <el-button
          v-has="'ordersMana:add'"
          type="primary"
          icon="el-icon-plus"
          @click="addOrder"
        >新增订单</el-button>
        <!-- <el-button icon="el-icon-delete" plain>删除</el-button> -->
      </div>
      <div>
        <el-button
          v-has="'ordersMana:export'"
          type="primary"
          icon="el-icon-upload2"
          @click="exportOrder"
        >导出</el-button>
      </div>
    </div>
    <TableWrap>
      <el-table
        height="100%"
        :data="tableData"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="55" align="center" />
        <el-table-column
          prop="orderNum"
          label="订单编号"
          min-width="180"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="pickupPlateNumbers"
          label="提货车牌号"
          min-width="150"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="quarantineCertificateNum"
          label="动物检疫合格证编号"
          min-width="150"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="farmName"
          label="养殖场名称"
          min-width="180"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="shipper"
          label="货主"
          min-width="120"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="wholesalerList"
          label="所属批发商"
          min-width="180"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="enterTime"
          label="进厂时间"
          min-width="180"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="branchName"
          label="所属网点"
          min-width="130"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="enterNum"
          label="进厂数量(只)"
          min-width="120"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="practicalEnterNum"
          label="实际进厂数量(只)"
          min-width="180"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="abnormalNum"
          label="异常数量(只)"
          min-width="180"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="orderStatus"
          label="订单状态"
          min-width="120"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p
              :class="
                scope.row.orderStatus === 1
                  ? 'root-status-b'
                  : scope.row.orderStatus === 2 || scope.row.orderStatus === 8
                    ? 'root-status-f'
                    : 'root-status-s'
              "
            >
              <span />
              {{
                scope.row.orderStatus === 1
                  ? '新订单'
                  : scope.row.orderStatus === 2
                    ? '提货中'
                    : scope.row.orderStatus === 3
                      ? '提货完成'
                      : scope.row.orderStatus === 4
                        ? '准入检疫完成'
                        : scope.row.orderStatus === 5
                          ? '交易完成'
                          : scope.row.orderStatus === 6
                            ? '准宰检疫完成'
                            : scope.row.orderStatus === 7
                              ? '准出检疫完成'
                              : scope.row.orderStatus === 8
                                ? '配送中'
                                : '订单完成'
              }}
            </p>
          </template>
        </el-table-column>

        <el-table-column
          prop="quarantineStatus"
          label="检疫状态"
          min-width="180"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p
              :class="
                scope.row.quarantineStatus === 1 ||
                  scope.row.quarantineStatus === 4 ||
                  scope.row.quarantineStatus === 7
                  ? 'root-status-f'
                  : scope.row.quarantineStatus === 2 ||
                    scope.row.quarantineStatus === 5 ||
                    scope.row.quarantineStatus === 8
                    ? 'root-status-s'
                    : 'root-status-r'
              "
            >
              <span />
              {{
                scope.row.quarantineStatus === 1
                  ? '准入检疫-等待'
                  : scope.row.quarantineStatus === 2
                    ? '准入检疫-通过'
                    : scope.row.quarantineStatus === 3
                      ? '准入检疫-异常'
                      : scope.row.quarantineStatus === 4
                        ? '准宰检疫-等待'
                        : scope.row.quarantineStatus === 5
                          ? '准宰检疫-通过'
                          : scope.row.quarantineStatus === 6
                            ? '准宰检疫-异常'
                            : scope.row.quarantineStatus === 7
                              ? '准出检疫-等待'
                              : scope.row.quarantineStatus === 8
                                ? '准出检疫-通过'
                                : '准出检疫-异常'
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="dispathStatus"
          label="调度状态"
          min-width="120"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p
              :class="
                scope.row.dispathStatus === 1 || scope.row.dispathStatus === 3
                  ? 'root-status-f'
                  : 'root-status-s'
              "
            >
              <span />
              {{
                scope.row.dispathStatus === 1
                  ? '提货未调度'
                  : scope.row.dispathStatus === 2
                    ? '提货已调度'
                    : scope.row.dispathStatus === 3
                      ? '配送未调度'
                      : '配送已调度'
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="transportationStatus"
          label="运输状态"
          min-width="120"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p
              :class="
                scope.row.transportationStatus === 1 ||
                  scope.row.transportationStatus === 6
                  ? 'root-status-b'
                  : scope.row.transportationStatus === 4 ||
                    scope.row.transportationStatus === 9
                    ? 'root-status-s'
                    : 'root-status-f'
              "
            >
              <span />
              {{
                scope.row.transportationStatus === 1
                  ? '新提货单'
                  : scope.row.transportationStatus === 2
                    ? '准备提货'
                    : scope.row.transportationStatus === 3
                      ? '提货中'
                      : scope.row.transportationStatus === 4
                        ? '提货完成'
                        : scope.row.transportationStatus === 5
                          ? '等待配送'
                          : scope.row.transportationStatus === 6
                            ? '新送货单'
                            : scope.row.transportationStatus === 7
                              ? '准备送货'
                              : scope.row.transportationStatus === 8
                                ? '送货中'
                                : '送货完成'
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="pickupOddNum"
          label="提货单号"
          min-width="180"
          :show-overflow-tooltip="true"
        />

        <el-table-column
          prop="pickupDriver"
          label="提货司机"
          min-width="150"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="pickupDriverPhone"
          label="司机联系方式"
          min-width="180"
          :show-overflow-tooltip="true"
        />
        <el-table-column fixed="right" label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button
              v-if="
                scope.row.orderStatus === 4 &&
                  scope.row.quarantineStatus !== 3 &&
                  scope.row.quarantineStatus !== 6 &&
                  scope.row.quarantineStatus !== 9
              "
              v-has="'ordersMana:transaction'"
              type="text"
              size="small"
              @click="handleClick(scope.row)"
            >交易</el-button>
            <el-button
              v-has="'ordersMana:edit'"
              type="text"
              size="small"
              @click="toEdit(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="toDetail(scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </TableWrap>
    <el-dialog
      v-if="eidtFormVisible"
      title="交易"
      :close-on-click-modal="false"
      destroy-on-close
      :visible.sync="eidtFormVisible"
      width="1100px"
      @close="closeDialog"
    >
      <div ref="detailinfowrap" class="detailinfo-wrap">
        <div ref="orderMess">
          <p class="l14">订单信息</p>
          <div class="router-info">
            <div>
              <p>订单编号：</p>
              <p>{{ detailsData.baseRouter.orderNum }}</p>
            </div>
            <div>
              <p>养殖场名称：</p>
              <p>{{ detailsData.baseRouter.farmName }}</p>
            </div>
            <div>
              <p>货主：</p>
              <p>{{ detailsData.baseRouter.shipper }}</p>
            </div>
            <div>
              <p>提货车牌号：</p>
              <p>{{ detailsData.baseRouter.pickupPlateNumbers }}</p>
            </div>
          </div>
          <div class="router-info">
            <div>
              <p>进厂数量：</p>
              <p>{{ detailsData.baseRouter.enterNum }}</p>
            </div>
            <div>
              <p>异常数量：</p>
              <p style="color: red">{{ detailsData.baseRouter.abnormalNum }}</p>
            </div>
            <div>
              <p>进厂时间：</p>
              <p>{{ detailsData.baseRouter.enterTime }}</p>
            </div>
          </div>
          <div class="line" />
          <div class="top">
            <p class="l14">交易信息</p>
          </div>
        </div>

        <div v-for="(list, idx) in DataList" :key="idx" ref="tableorder" class="table-order">
          <div class="DataList">
            <el-form
              ref="ruleForm"
              :model="list"
              :rules="rules"
              class="demo-ruleForm"
            >
              <el-form-item
                ref="wholeSaler"
                label-width="110px"
                label="所属批发商:"
                prop="wholeSaler"
                label-position="left"
              >
                <el-select
                  v-model="list.wholeSaler"
                  style="width:150px"
                  size="small"
                  placeholder="请选择所属批发商"
                  filterable
                  allow-create
                  @change="wholesalerChange($event, idx)"
                  @focus="clickwholesaler($event, idx)"
                >
                  <el-option
                    v-for="(item, index) in wholesalerList"
                    :key="index"
                    style="width:150px"
                    :label="item.name"
                    :value="JSON.stringify(item)"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label-width="120px"
                label="实际进厂数量:"
                prop="actualEnterNum"
              >
                <el-input
                  v-model="list.actualEnterNum"
                  size="small"
                  autocomplete="off"
                  maxlength="5"
                  style="width:150px"
                  placeholder="请输入实际进厂数量"
                  @input="
                    ;(list.actualEnterNum = list.actualEnterNum.replace(
                      /[^\d]/g,
                      ''
                    )),
                      dealNum(list.actualEnterNum, idx)
                  "
                />
              </el-form-item>
            </el-form>
            <el-button
              size="small"
              type="primary"
              icon="el-icon-plus"
              @click="addMultyHang(idx)"
            >添加同数行</el-button>
            <el-button
              size="small"
              type="primary"
              icon="el-icon-plus"
              @click="addHang(idx)"
            >新增单行</el-button>
            <el-button
              v-if="idx === 0"
              size="small"
              type="primary"
              icon="el-icon-plus"
              @click="addwholesaler()"
            >新增批发商</el-button>
            <el-button
              v-if="idx > 0"
              size="small"
              plain
              icon="el-icon-delete"
              @click="deletewholesaler(idx)"
            >删除批发商</el-button>
          </div>
          <el-table
            :data="list.saveCertManListRequestDTO"
            tooltip-effect="dark"
            border
            style="width: 100%"
            center
            size="mini"
          >
            <el-table-column prop="merchantCode" label="商户代号" width="180">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.merchantCode"
                  filterable
                  size="small"
                  placeholder="请选择"
                  @change="handleCommand($event, scope.$index, idx)"
                  @focus="clickCmerchantCode(scope.$index, idx)"
                  
                  @visible-change="merchantDropDownClose($event,scope.$index, idx)"
                >
                  <el-option
                    v-for="(item, index) in merchants[idx]"
                    :key="index"
                    :label="item.merchantCode"
                    v-show="!item.isChecked"
                    :value="item"
                  />
                  <span slot="empty">
                    <p style=" text-align: center;line-height: 50px;">
                      {{ titleMessage }}
                    </p>
                  </span>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="merchantNum"
              label="商户编号"
              width="150"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="merchantName"
              label="商户名称"
              width="120"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="type"
              label="商户类型"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                {{
                  scope.row.type === 1
                    ? '大客户'
                    : scope.row.type === 2
                      ? '散户'
                      : ''
                }}
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="商户地址"
              width="120"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="purchaseQuantity"
              label="购买数量（只）"
              width="160"
            >
              <template slot-scope="scope">
                <el-input-number
                  v-model.number="scope.row.purchaseQuantity"
                  size="mini"
                  :min="0"
                  :step="0.5"
                  :step-strictly="true"
                  @change="changepurchaseQuantity(idx)"
                />
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.$index > 0"
                  type="text"
                  size="small"
                  @click="deltableMerchant(scope.$index, idx)"
                >删除</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="points(scope.row, scope.$index, idx)"
                >分边</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-col :span="12" style="text-align:left;">
        <span style="font-size: 14px;margin-right: 30px;">可交易数：{{this.yesDeal}}只</span>
        <span style="font-size: 14px;">已交易数：{{this.noDeal}}只</span>
        </el-col>
        <el-col :span="12">
        <el-button size="mini" @click="closeDialog">取消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="resetCarInfo('ruleForm')"
        >确定</el-button>
        </el-col>
      </div>
    </el-dialog>
    <deleteDloag ref="deleteDloag" @confirmDel="confirmDel" />
    <!-- //分栏 -->
    <points
      ref="points"
      @confirmPoints="confirmPoints"
      @confirmCancle="confirmCancle"
    />
    <pointNo ref="pointNo" />
    <submit ref="submitSure" />
    <submitFen ref="submitFen" />
    <submitBJ ref="submitBJ" />
    <submitZS ref="submitZS" />
  </div>
</template>

<script>
import Pagination from '@/components/pagination'
import TableWrap from '@/components/TableWrap'
import OrderApi from '@/api/orderApi'
import { dropDownfarm, dropDownwholesaler, dropDowndriver } from '@/api/jyzyy'
import _ from 'lodash'
import deleteDloag from '@/views/orderlist/component/deleteDloag'
import points from '@/views/orderlist/component/points'
import pointNo from '@/views/orderlist/component/pointNo'
import submit from '@/views/orderlist/component/submit'
import submitFen from '@/views/orderlist/component/submitFen'
import submitBJ from '@/views/orderlist/component/submitBJ'
import submitZS from '@/views/orderlist/component/submitZS'
import { branchDropDown } from '@/utils/mixin'
export default {
  components: {
    Pagination,
    TableWrap,
    deleteDloag,
    points,
    pointNo,
    submit,
    submitFen,
    submitBJ,
    submitZS
  },
  mixins: [branchDropDown],
  data() {
    var checkNUM = (rule, value, callback) => {
      if (value) {
        if (/^.{2,20}$/.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入2-20位的文本'))
        }
      } else {
        callback()
      }
    }
    return {
      total: 200,
      formSearch: {
        dispathStatus: '',
        enterTime: '',
        farmName: '',
        orderNum: '',
        orderStatus: '',
        pickupDriver: '',
        pickupDriverPhone: '',
        pickupOddNum: '',
        pickupPlateNumbers: '',
        quarantineStatus: '',
        shipper: '',
        transportationStatus: '',
        wholesaler: ''
      },
      eidtFormVisible: false,

      TableHeight: '300px',
      listQuery: {
        page: 1,
        limit: 10
      },
      tableData: [],
      DataList: [
        {
          wholeSaler: '',
          actualEnterNum: '',
          quantityOnHand: '10',
          yesDeal: 0,
          noDeal: 0,
          saveCertManListRequestDTO: [
            {
              merchantCode: '',
              merchantId: '',
              merchantName: '',
              address: '',
              merchantNum: '',
              type: '',
              purchaseQuantity: 1,
              addMerchantPigDetailsRequestDto: []
            }
          ]
        }
      ],
      orderId: '',
      yesDeal: 0,
      noDeal: 0,
      detailsData: {
        // 详情数据
        baseRouter: {
          orderId: '',
          orderNum: '',
          farmName: '',
          shipper: '',
          wholesaler: '',
          enterNum: '',
          practicalEnterNum: '',
          abnormalNum: '',
          enterTime: '',
          name: '',
          carCode: '',
          status: '',
          data: [
            {
              merchantCode: '',
              merchantId: '',
              merchantName: '',
              merchantNum: '',
              type: '',
              purchaseQuantity: ''
            }
          ]
        }
      },

      wholesalerList: [],
      farmNameList: [],
      driverList: [],
      restaurants: [],
      deletewholesaleridx: 0,
      merchantCodeList: [],
      isSearchLength: true,
      titleMessage: '暂无数据',
      formLabelWidth: '100px',
      rules: {
        wholeSaler: [
          { required: true, message: '请选择所属批发商', trigger: 'change' },
          { validator: checkNUM, trigger: 'change' }
        ],
        actualEnterNum: [
          {
            required: true,
            message: '请输入生猪实际进厂数量',
            trigger: 'change'
          }
        ]
      },
      pointsIndex: 0,
      pointsidx: 0,
      fatherCode: '',
      merchatAllData: [],
      fathermerchantId: '',
      wholesalerListALL: [],
      showSearch: false,
      merchants: []
    }
  },
  created() {
    OrderApi.postqueryAllRoutedMerchant().then(res => {
      this.restaurants = res.result
      this.merchants.push(JSON.parse(JSON.stringify(this.restaurants)));
      this.merchantCodeList = res.result
    })
    dropDownfarm().then(res => {
      this.farmNameList = res.result
    })
    dropDownwholesaler().then(res => {
      this.wholesalerList = res.result
      this.wholesalerListALL = res.result
    })
    dropDowndriver().then(res => {
      this.driverList = res.result
    })
    this.getList()
  },

  methods: {
    dealNum(val, idx) {
      console.log(val, idx)
      this.DataList[idx].yesDeal = val - this.DataList[idx].noDeal;
      var yes = 0;
      this.DataList.forEach(v => {
        yes += v.yesDeal;
      });
      this.yesDeal = yes;
    },
    clickwholesaler(val, idx) {
      this.wholesalerList = this.wholesalerListALL
      this.DataList.forEach((v, i) => {
        this.wholesalerList = this.wholesalerList.filter(
          o => o.name != v.wholeSaler
        )
      })
      this.wholesalerListALL.forEach(v => {
        if (this.DataList[idx].wholeSaler === v.name) {
          this.wholesalerList.unshift(v)
        }
      })
      console.log(this.wholesalerList)
      if (this.merchants[idx].filter(v => !v.isChecked).length > 0) {
        this.titleMessage = ''
      } else {
        this.titleMessage = '无匹配数据'
      }
    },
    wholesalerChange(val, idx) {
      if (val.length < 30) {
        const is = this.DataList.filter(v => v.wholeSaler === val)
        if (is.length > 1) {
          this.$message.warning('批发商名称不能重复')
        }
        this.DataList[idx].quantityOnHand = 0
        this.DataList[idx].wholeSaler = val
        this.DataList[idx].wholeSalerName = val
        this.DataList[idx].wholeSalerId = ''
        this.$refs.wholeSaler.validate()
      } else {
        this.DataList[idx].quantityOnHand = JSON.parse(val).quantityOnHand
        this.DataList[idx].wholeSalerId = JSON.parse(val).id
        this.DataList[idx].wholeSaler = JSON.parse(val).name
        this.DataList[idx].wholeSalerName = ''
      }
    },
    // 分边按钮  obj当前行数据  index:table  行index  idx:最外层索引
    points(obj, index, idx) {
      if (
        this.DataList[idx].saveCertManListRequestDTO[index].merchantCode &&
        this.DataList[idx].saveCertManListRequestDTO[index].purchaseQuantity
      ) {
        this.fatherCode = obj.merchantCode
        this.fathermerchantId = obj.merchantId
        this.fathermerchantNum = obj.merchantNum
        var dataList = this.DataList[idx].saveCertManListRequestDTO.map(v => {
          return {
            merchantCode: v.merchantCode,
            merchantId: v.merchantId,
            merchantNum: v.merchantNum
          }
        })
        dataList = dataList.filter(v => v.merchantCode != '')
        this.pointsIndex = index
        this.pointsidx = idx
        this.$refs.points.fatherNum = obj.purchaseQuantity
        this.$refs.points.fatherCode = obj.merchantCode
        this.$refs.points.restaurants = dataList
        this.$refs.points.merchantCodeList = dataList
        this.$refs.points.fun(obj.merchantCode)
        this.$refs.points.rest()
        this.$refs.points.addMerchantPigDetailsRequestDto =
          obj.addMerchantPigDetailsRequestDto
        this.merchatAllData = JSON.parse(
          JSON.stringify(obj.addMerchantPigDetailsRequestDto)
        )
        this.$refs.points.innerVisible = true
      } else {
        this.$refs.pointNo.innerVisible = true
      }
    },
    confirmCancle() {
      this.DataList[this.pointsidx].saveCertManListRequestDTO[
        this.pointsIndex
      ].addMerchantPigDetailsRequestDto = this.merchatAllData
    },
    confirmPoints(arr) {
      this.DataList[this.pointsidx].saveCertManListRequestDTO[
        this.pointsIndex
      ].addMerchantPigDetailsRequestDto = arr
      this.DataList[this.pointsidx].saveCertManListRequestDTO.forEach(
        (v, i) => {
          if (i !== this.pointsIndex) {
            arr.forEach(q => {
              if (q.son === v.merchantCode) {
                v.addMerchantPigDetailsRequestDto.push({
                  merchantCode: this.fatherCode,
                  merchantId: this.fathermerchantId,
                  merchantNum: this.fathermerchantNum,
                  divideNumber: q.divideNumber,
                  isNo: '2',
                  father: this.fatherCode
                })
              }
            })
            v.addMerchantPigDetailsRequestDto = this.uniqueArray(
              v.addMerchantPigDetailsRequestDto,
              'merchantCode'
            )
          }
        }
      )

      this.DataList[this.pointsidx].saveCertManListRequestDTO.forEach(
        (v, i) => {
          if (i !== this.pointsIndex) {
            if (v.addMerchantPigDetailsRequestDto[0] == undefined) {
              v.addMerchantPigDetailsRequestDto = []
            }
            v.addMerchantPigDetailsRequestDto.forEach((w, idx) => {
              if (w.isNo === '2') {
                const findidx = this.DataList[
                  this.pointsidx
                ].saveCertManListRequestDTO.findIndex(
                  e => e.merchantCode === w.merchantCode
                )
                console.log('findidx', findidx)
                if (findidx === -1) {
                  v.addMerchantPigDetailsRequestDto.splice(idx, 1)
                  return
                }
                const isqwe = this.DataList[
                  this.pointsidx
                ].saveCertManListRequestDTO[
                  findidx
                ].addMerchantPigDetailsRequestDto.some(
                  r => r.merchantCode === v.merchantCode && r.isNo === '1'
                )
                if (!isqwe) {
                  v.addMerchantPigDetailsRequestDto.splice(idx, 1)
                }
              }
            })
          }
        }
      )
      console.log(
        this.DataList[this.pointsidx].saveCertManListRequestDTO[
          this.pointsIndex
        ]
      )
      this.$refs.points.innerVisible = false
      this.$refs.points.rest()
    },
    clickCmerchantCode(index, idx) {      
      // this.restaurants = this.merchantCodeList
      // this.DataList[idx].saveCertManListRequestDTO.forEach((v, i) => {
      //   if (v.merchantCode == '') {
      //     console.log(v)
      //   } else {
      //     this.restaurants = this.restaurants.filter(
      //       o => o.merchantCode != v.merchantCode
      //     )
      //   }
      // })
      var currentMerchants = this.merchants[idx];
      currentMerchants.forEach(v => {
        if (
          this.DataList[idx].saveCertManListRequestDTO[index].merchantCode ===
          v.merchantCode
        ) {
          v.isChecked = false;
          return;
        }
      })
      if (currentMerchants.filter(v => !v.isChecked).length > 0) {
        this.titleMessage = ''
      } else {
        this.titleMessage = '无匹配数据'
      }
    },
    merchantDropDownClose(callback,index,idx) {      
      if(!callback) {
        //下拉框隐藏触发
        var currentMerchants = this.merchants[idx];
        currentMerchants.forEach(v => {
          if (
            this.DataList[idx].saveCertManListRequestDTO[index].merchantCode ===
            v.merchantCode
          ) {
            v.isChecked = true;
            return;
          }
        });
      }
    },
    // 去重
    uniqueArray(array, key) {
      var result = [array[0]]
      for (var i = 1; i < array.length; i++) {
        var item = array[i]
        var repeat = false
        for (var j = 0; j < result.length; j++) {
          if (item[key] == result[j][key]) {
            repeat = true
            break
          }
        }
        if (!repeat) {
          result.push(item)
        }
      }
      return result
    },
    deltableMerchant(index, idx) {
      var merchantId = this.DataList[idx].saveCertManListRequestDTO[index].merchantId;
      this.merchants[idx].forEach(v => {
        if(v.merchantId === merchantId) {
          v.isChecked = false;
        }
      });
      this.DataList[idx].saveCertManListRequestDTO.splice(index, 1);
      this.DataList[idx].saveCertManListRequestDTO.forEach(v => {
        v.addMerchantPigDetailsRequestDto.forEach((z, x) => {
          const findidx = this.DataList[idx].saveCertManListRequestDTO.findIndex(
            e => e.merchantCode === z.merchantCode
          )
          if (findidx === -1) {
            v.addMerchantPigDetailsRequestDto.splice(x, 1)
            return
          }
        })
      })
      this.getDeal(idx);

    },
    changepurchaseQuantity(idx) {
      console.log(idx)
      this.getDeal(idx)
    },
    getDeal(idx) {
      // this.DataList.forEach((v, i) => {
      //   v.saveCertManListRequestDTO = v.saveCertManListRequestDTO.filter(
      //     z => z.merchantCode != ''
      //   )
      // })
      if (
        (this.DataList[idx].noDeal =
          this.DataList[idx].saveCertManListRequestDTO.length > 1)
      ) {
        this.DataList[idx].noDeal = this.DataList[
          idx
        ].saveCertManListRequestDTO.reduce((a, b) => {
          if (b.merchantCode == '' && typeof a === 'object') {
            return a.purchaseQuantity + 0
          }
          if (b.merchantCode == '' && typeof a === 'number') {
            return a + 0
          }
          if (typeof a === 'object') {
            return a.purchaseQuantity + b.purchaseQuantity
          } else {
            return a + b.purchaseQuantity
          }
        })
      } else {
        this.DataList[idx].noDeal = this.DataList[idx].saveCertManListRequestDTO[0].purchaseQuantity

        this.$forceUpdate()
      }
      this.DataList[idx].yesDeal = this.DataList[idx].actualEnterNum - this.DataList[idx].noDeal;
      var no = 0;
      var yes = 0;
      this.DataList.forEach(v => {
        no += v.noDeal;
        yes += v.yesDeal;
      });
      this.yesDeal = yes;
      this.noDeal = no;
    },
    handleCommand(val, index, idx) { 
      this.getDeal(idx);
      var currentMerchants = this.merchants[idx];
      for(var i = 0;i < currentMerchants.length;i++) {
        if(currentMerchants[i].merchantId === val.merchantId) {
          console.log(currentMerchants[i].merchantId);
          currentMerchants[i].isChecked = !currentMerchants[i].isChecked;
          break;
        }
      }
      // this.restaurants.forEach(v => {
      //   if(v.merchantId === val.merchantId) {
      //     console.log(v.merchantId);
      //     v.isChecked = true;
      //   }
      // });
      val.purchaseQuantity = this.DataList[idx].saveCertManListRequestDTO[
        index
      ].purchaseQuantity
      val.addMerchantPigDetailsRequestDto = []
      this.DataList[idx].saveCertManListRequestDTO.splice(index, 1, val)
      this.DataList[idx].saveCertManListRequestDTO.forEach(v => {
        v.addMerchantPigDetailsRequestDto.forEach((z, x) => {
          const findidx = this.DataList[idx].saveCertManListRequestDTO.findIndex(
            e => e.merchantCode === z.merchantCode
          )
          if (findidx === -1) {
            v.addMerchantPigDetailsRequestDto.splice(x, 1)
            return
          }
        })
      })
      // this.pointsidx = idx
      // this.pointsIndex = index
      // this.confirmPoints([])
    },
    change(e) {
      this.$forceUpdate()
    },
    handleSelect(a, b) {
      b.purchaseQuantity = ''
      this.detailsData.baseRouter.saveCertManListRequestDTO[a] = b
    },
    querySearch(queryString, cb) {
      OrderApi.postdropDownmerchant().then(res => {
        this.restaurants = res.result;
        cb(res.result)
      })
    },
    exportOrder: _.debounce(function() {
      const that = this
      window.location.href = OrderApi.postordersrexportOrders(
        `dispathStatus=${that.formSearch.dispathStatus}&enterTimeStart=${
          that.formSearch.enterTime
            ? that.formSearch.enterTime[0] + ' 00:00:00'
            : ''
        }&enterTimeEnd=${
          that.formSearch.enterTime
            ? that.formSearch.enterTime[1] + ' 23:59:59'
            : ''
        }&farmName=${that.formSearch.farmName}&orderNum=${
          that.formSearch.orderNum
        }&orderStatus=${that.formSearch.orderStatus}&pickupDriver=${
          that.formSearch.pickupDriver
        }&pickupDriverPhone=${that.formSearch.pickupDriverPhone}&pickupOddNum=${
          that.formSearch.pickupOddNum
        }&pickupPlateNumbers=${
          that.formSearch.pickupPlateNumbers
        }&quarantineStatus=${that.formSearch.quarantineStatus}&shipper=${
          that.formSearch.shipper
        }&transportationStatus=${
          that.formSearch.transportationStatus
        }&wholesaler=${that.formSearch.wholesaler}&branchId=${this.formSearch.branchId}`
      )
    }, 500),

    submitForm() {
      const data = {
        branchId: this.formSearch.branchId,
        dispathStatus:
          this.formSearch.dispathStatus === ''
            ? null
            : Number(this.formSearch.dispathStatus),
        enterTimeStart:
          this.formSearch.enterTime === '' ? '' : this.formSearch.enterTime[0],
        enterTimeEnd:
          this.formSearch.enterTime === '' ? '' : this.formSearch.enterTime[1],
        farmName: this.formSearch.farmName,
        orderNum: this.formSearch.orderNum,
        orderStatus:
          this.formSearch.orderStatus === ''
            ? null
            : Number(this.formSearch.orderStatus),
        pageNum: 1,
        pageSize: 10,
        pickupDriver: this.formSearch.pickupDriver,
        pickupDriverPhone: this.formSearch.pickupDriverPhone,
        pickupOddNum:
          this.formSearch.pickupOddNum === ''
            ? null
            : this.formSearch.pickupOddNum,
        pickupPlateNumbers: this.formSearch.pickupPlateNumbers,
        quarantineStatus:
          this.formSearch.quarantineStatus === ''
            ? null
            : Number(this.formSearch.quarantineStatus),
        shipper: this.formSearch.shipper,
        transportationStatus:
          this.formSearch.transportationStatus === ''
            ? null
            : Number(this.formSearch.transportationStatus),
        wholesaler: this.formSearch.wholesaler
      }
      OrderApi.postAddOrdersqueryOrdersByRequest(data).then(res => {
        this.tableData = res.result.list
        this.total = res.result.total

        this.listQuery = {
          page: 1,
          limit: 10
        }
      })
    },
    resetForm() {
      for (const key in this.formSearch) {
        this.formSearch[key] = ''
      }
      this.formSearch.branchId = localStorage.getItem('userTypeSW') === '0' ? '' : localStorage.getItem('nowbranchDropDown')
      this.submitForm()
    },
    getList() {
      const data = {
        branchId: this.formSearch.branchId,
        dispathStatus:
          this.formSearch.dispathStatus === ''
            ? null
            : Number(this.formSearch.dispathStatus),
        enterTimeStart:
          this.formSearch.enterTime === '' ? '' : this.formSearch.enterTime[0],
        enterTimeEnd:
          this.formSearch.enterTime === '' ? '' : this.formSearch.enterTime[1],
        farmName: this.formSearch.farmName,
        orderNum: this.formSearch.orderNum,
        orderStatus:
          this.formSearch.orderStatus === ''
            ? null
            : Number(this.formSearch.orderStatus),
        pageNum: this.listQuery.page,
        pageSize: this.listQuery.limit,
        pickupDriver: this.formSearch.pickupDriver,
        pickupDriverPhone: this.formSearch.pickupDriverPhone,
        pickupOddNum:
          this.formSearch.pickupOddNum === ''
            ? null
            : this.formSearch.pickupOddNum,
        pickupPlateNumbers: this.formSearch.pickupPlateNumbers,
        quarantineStatus:
          this.formSearch.quarantineStatus === ''
            ? null
            : Number(this.formSearch.quarantineStatus),
        shipper: this.formSearch.shipper,
        transportationStatus:
          this.formSearch.transportationStatus === ''
            ? null
            : Number(this.formSearch.transportationStatus),
        wholesaler: this.formSearch.wholesaler
      }
      OrderApi.postAddOrdersqueryOrdersByRequest(data).then(res => {
        this.tableData = res.result.list

        this.total = res.result.total
      })
    },
    addOrder() {
      this.$router.push({
        path: 'addorder'
      })
    },
    toEdit(e) {
      localStorage.setItem('orderId', e.id)
      this.$router.push({
        path: 'editorder',
        query: {
          orderId: e.id
        }
      })
    },
    toDetail(e) {
      localStorage.setItem('orderId', e.id)
      this.$router.push({
        path: 'orderdetail',
        query: {
          orderId: e.id,
          wholesaler: e.wholesalerList
        }
      })
    },
    // 交易按钮
    handleClick(obj) {
      this.orderId = obj.id
      this.DataList = [
        {
          wholeSaler: '',
          actualEnterNum: '',
          quantityOnHand: '',
          yesDeal: 0,
          noDeal: 0,
          saveCertManListRequestDTO: [
            {
              merchantCode: '',
              merchantId: '',
              merchantName: '',
              address: '',
              merchantNum: '',
              type: '',
              purchaseQuantity: 1,
              addMerchantPigDetailsRequestDto: []
            }
          ]
        }
      ]
      this.detailsData.baseRouter.data = []
      this.detailsData.baseRouter.data.push({
        merchantCode: '',
        merchantId: '',
        merchantName: '',
        merchantNum: '',
        type: '',
        purchaseQuantity: ''
      })
      this.detailsData.baseRouter.orderNum = obj.orderNum
      this.detailsData.baseRouter.farmName = obj.farmName
      this.detailsData.baseRouter.orderId = obj.id
      this.detailsData.baseRouter.shipper = obj.shipper
      this.detailsData.baseRouter.wholesaler = obj.wholesaler
      this.detailsData.baseRouter.enterNum = obj.enterNum
      this.detailsData.baseRouter.practicalEnterNum = obj.practicalEnterNum
      this.detailsData.baseRouter.abnormalNum = obj.abnormalNum
      this.detailsData.baseRouter.enterTime = obj.enterTime
      this.detailsData.baseRouter.pickupPlateNumbers = obj.pickupPlateNumbers

      this.merchants.push(JSON.parse(JSON.stringify(this.restaurants)));
      dropDownwholesaler().then(res => {
        this.wholesalerList = res.result
        this.eidtFormVisible = true
      });
    },
    // 交易确定
    resetCarInfo: _.debounce(function() {
      var issure = []
      this.$refs.ruleForm.forEach(v => {
        v.validate(valid => {
          if (valid) {
            issure.push(true)
          } else {
            issure.push(false)
          }
        })
      })
      const issureall = issure.every(v => v)
      if (!issureall) {
        return
      }
      const iswhole = this.DataList.every(v => v.wholeSaler != '')
      const isactualEnterNum = this.DataList.every(v => v.actualEnterNum != '')
      if (!iswhole) {
        this.$message.warning('请选择批发商')
        return
      }
      if (!isactualEnterNum) {
        this.$message.warning('请填写实际进厂数量')
        return
      }
      var iscodeArr = []
      this.DataList.forEach((v, i) => {
        const iscode = v.saveCertManListRequestDTO.every(
          z => z.merchantCode != ''
        )
        iscodeArr.push(iscode)
      })
      const iscodeAll = iscodeArr.every(v => v)
      if (!iscodeAll) {
        this.$message.warning('商户代号不能为空')
        return
      }
      // 校验批发商名称是否重复
      var ishaveWhole = []
      this.DataList.forEach((v, i) => {
        const ishave = this.DataList.some((q, idx) => {
          if (i !== idx) {
            return q.wholeSaler === v.wholeSaler
          }
        })
        ishaveWhole.push(ishave)
      })
      const ishaveWholes = ishaveWhole.every(v => !v)
      if (!ishaveWholes) {
        this.$message.warning('批发商名称不能重复')
        return
      }
      var sumEnter = 0
      var buyNum = 0
      var quantNum = 0
      this.DataList.forEach(v => {
        sumEnter += Number(v.actualEnterNum)
        quantNum += Number(v.quantityOnHand)
        v.saveCertManListRequestDTO.forEach(z => {
          buyNum += Number(z.purchaseQuantity)
        })
      })

      if (buyNum != sumEnter) {
        this.$refs.submitSure.innerVisible = true
        this.$refs.submitSure.title = '保存失败'
        this.$refs.submitSure.message = `当前交易数量为<span style="font-weight:bold;color:red;font-size:19px">${buyNum}</span>只，与实际进厂数量<span style="font-weight:bold;font-size:19px">${sumEnter}</span>只不符，请检查交易信息或修改实际进厂数量`
        return
      }
      // 交易总数不能存在小数
      if (buyNum.toString().indexOf('.') !== -1) {
        this.$refs.submitSure.innerVisible = true
        this.$refs.submitSure.title = '保存失败'
        this.$refs.submitSure.message = `交易总数不能存在小数,当前交易总数为<span style="font-weight:bold;font-size:19px">${buyNum}</span>,请检查并修改交易数据`
        return
      }
      // 是否分边操作
      var arrNoFenB = []
      this.DataList.forEach((v, i) => {
        arrNoFenB.push({
          wholeSaler: v.wholeSaler,
          data: []
        })
        v.saveCertManListRequestDTO.forEach((q, idx) => {
          if (q.purchaseQuantity.toString().indexOf('.') !== -1) {
            if (q.addMerchantPigDetailsRequestDto[0] == undefined) {
              q.addMerchantPigDetailsRequestDto = []
            }
            if (q.addMerchantPigDetailsRequestDto.length <= 0) {
              arrNoFenB[i].data.push(q)
            }
          }
        })
      })
      arrNoFenB = arrNoFenB.filter(v => v.data.length > 0)
      if (arrNoFenB.length) {
        var arrLength = 0
        arrNoFenB.forEach(v => {
          arrLength += v.data.length
        })
        this.$refs.submitFen.data = arrNoFenB
        this.$refs.submitFen.message = `共有${arrLength}条数据未进行分边操作，请分边后保存订单：`
        this.$refs.submitFen.innerVisible = true
        return
      }
      // 交易数小于分边数
      var ArrFen = []
      this.DataList.forEach((v, i) => {
        ArrFen.push({
          wholeSaler: v.wholeSaler,
          data: []
        })
        v.saveCertManListRequestDTO.forEach(q => {
          var sunFB = 0 // 每个商户分边数
          if (q.addMerchantPigDetailsRequestDto[0] == undefined) {
            q.addMerchantPigDetailsRequestDto = []
          }
          q.addMerchantPigDetailsRequestDto.forEach(w => {
            sunFB += Number(w.divideNumber)
          })
          if (Number(q.purchaseQuantity) < sunFB / 2) {
            ArrFen[i].data.push(q)
          }
        })
      })
      ArrFen = ArrFen.filter(v => v.data.length > 0)
      if (ArrFen.length) {
        this.$refs.submitBJ.data = ArrFen
        this.$refs.submitBJ.innerVisible = true
        return
      }
      // 商户交易数-分边数/2=整数
      var ArrFen2 = []
      this.DataList.forEach((v, i) => {
        ArrFen2.push({
          wholeSaler: v.wholeSaler,
          data: []
        })
        v.saveCertManListRequestDTO.forEach(q => {
          var sunFB = 0 // 每个商户分边数
          if (q.addMerchantPigDetailsRequestDto[0] == undefined) {
            q.addMerchantPigDetailsRequestDto = []
          }
          q.addMerchantPigDetailsRequestDto.forEach(w => {
            sunFB += Number(w.divideNumber)
          })
          if (
            (Number(q.purchaseQuantity) - sunFB / 2).toString().indexOf('.') !=
            -1
          ) {
            ArrFen2[i].data.push(q)
          }
        })
      })
      ArrFen2 = ArrFen2.filter(v => v.data.length > 0)
      if (ArrFen2.length) {
        this.$refs.submitZS.data = ArrFen2
        this.$refs.submitZS.innerVisible = true
        return
      }
      // 全部校验通过
      const apiData = this.DataList.map(v => {
        var arrqwer = []
        v.saveCertManListRequestDTO.forEach(z => {
          if (z.addMerchantPigDetailsRequestDto[0] == undefined) {
            z.addMerchantPigDetailsRequestDto = []
          }
          z.divideNumber = z.addMerchantPigDetailsRequestDto.length
          arrqwer.push({
            addMerchantPigDetailsRequestDto: z.addMerchantPigDetailsRequestDto,
            saveCertManListRequestDTO: z
          })
        })
        return {
          actualEnterNum: v.actualEnterNum,
          merchantPigListDto: arrqwer,
          wholeSalerId: v.wholeSalerId ? v.wholeSalerId : '',
          wholeSalerName: v.wholeSalerName ? v.wholeSalerName : '',
          orderId: this.orderId
        }
      })
      OrderApi.saveCertificateManagementInfo(apiData).then(res => {
        this.$message.success('交易成功')
        this.eidtFormVisible = false
        this.submitForm()
      });
      this.yesDeal = 0;
      this.noDeal = 0;
      this.merchants = [];
    }, 200),
    // 交易列表删除数据
    del(val) {
      this.detailsData.baseRouter.data.splice(val, 1)
    },
    // 新增批发商
    addwholesaler() {
      console.log(this.DataList.length)
      if (this.DataList.length > 19) {
        this.$message.warning('最多可添加20组批发商信息')
        return
      }
      this.DataList.push({
        wholeSaler: '',
        actualEnterNum: '',
        quantityOnHand: '',
        yesDeal: 0,
        noDeal: 0,
        saveCertManListRequestDTO: [
          {
            merchantCode: '',
            merchantId: '',
            merchantName: '',
            merchantNum: '',
            type: '',
            purchaseQuantity: 1,
            addMerchantPigDetailsRequestDto: []
          }
        ]
      })
      this.$nextTick(() => {
        if (this.$refs.detailinfowrap.scrollHeight > 500) {
          this.$refs.detailinfowrap.scrollTop = this.$refs.detailinfowrap.scrollHeight - 500
        }
      })
      this.merchants.push(JSON.parse(JSON.stringify(this.restaurants)));
    },
    deletewholesaler(idx) {
      this.deletewholesaleridx = idx
      this.$refs.deleteDloag.title = '确认提示'
      this.$refs.deleteDloag.message =
        '当前批发商的交易将不会保存，是否确认删除？'
      this.$refs.deleteDloag.innerVisible = true      
    },
    confirmDel() {
      this.DataList.splice(this.deletewholesaleridx, 1)
      this.merchants.splice(this.deletewholesaleridx, 1);
    },
    // 新增行
    addHang(idx) {
      this.DataList[idx].saveCertManListRequestDTO.push({
        merchantCode: '',
        merchantId: '',
        merchantName: '',
        address: '',
        merchantNum: '',
        type: '',
        purchaseQuantity: 1,
        addMerchantPigDetailsRequestDto: []
      })
      // this.$nextTick(() => {
      //   if (this.$refs.detailinfowrap.scrollHeight > 470) {
      //     if (this.DataList.length == 1) {
      //       this.$refs.detailinfowrap.scrollTop = this.$refs.detailinfowrap.scrollHeight - 500
      //     } else {
      //       var heightAll = 0
      //       for (let i = 0; i <= idx; i++) {
      //         heightAll += this.$refs.tableorder[i].scrollHeight + 20
      //       }
      //       this.$refs.detailinfowrap.scrollTop = heightAll + this.$refs.orderMess.scrollHeight - 500
      //     }
      //   }
      // })
    },
    addMultyHang(idx) {
      var hangEnterNum = this.DataList[idx].actualEnterNum;
      if(hangEnterNum!==undefined &&hangEnterNum!==null&&hangEnterNum!='') {
        if(hangEnterNum > 10) {
          this.$message.warning('添加行数超过10行，已自动添加10行，请手动添加剩余行数！');
          hangEnterNum = 10;
        }
        for(var i = 0;i<hangEnterNum-1;i++) {
          this.addHang(idx);
        }
      }      
    },
    closeDialog() {
      this.eidtFormVisible = false;
      this.yesDeal = 0;
      this.noDeal = 0;
      this.merchants = [];
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  padding-bottom: 30px;
  font-size: 14px;
  color: #606266;
}
.DataList {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 15px;
  margin-top: 15px;
  &-cun {
  }
  .el-form-item {
    margin-bottom: 0px;
  }
}
.demo-ruleForm {
  display: flex;
  align-items: center;
}
.input-text {
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: 0;
  border: 1px solid #ccc;
  text-indent: 10px;
}
.detailinfo-wrap {
  max-height: 500px;
  width: 100%;
  overflow-y: auto;
}
.router-info {
  display: flex;
  align-items: center;
  margin: 8px 0;
  padding: 0 20px;
  div {
    display: flex;
    // align-items: center
    margin-right: 20px;
    padding-left: 10px;
    color: #999;
    p:nth-of-type(1) {
      white-space: nowrap;
    }
  }
}
.search-wrap {
  /deep/.el-input {
    width: 200px !important;
    margin-right: 15px;
  }
}

.btn-wrap {
  display: flex;
  justify-content: flex-end;
  button {
    margin: 10px;
  }
}
.l14 {
  margin: 10px 0;
}
.car-from {
  .el-select .el-input.is-disabled .el-input__inner {
  }
}
.line {
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 20px;
}
.top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
