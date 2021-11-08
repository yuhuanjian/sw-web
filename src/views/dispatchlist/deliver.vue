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
      <el-form
        ref="formSearch"
        :inline="true"
        :model="formSearch"
        class="demo-form-inline"
      >
        <el-form-item label="" prop="distributionOrderCode">
          <el-input
            v-model="formSearch.distributionOrderCode"
            placeholder="请输入配送单号"
          />
        </el-form-item>
        <el-form-item label="" prop="routeName">
          <el-input
            v-model="formSearch.routeName"
            placeholder="请输入路由名称"
          />
        </el-form-item>
        <el-form-item label="" prop="status">
          <el-select v-model="formSearch.status" placeholder="调度状态">
            <el-option label="未调度" value="1" />
            <el-option label="部分调度" value="2" />
            <el-option label="已调度" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="date">
          <el-date-picker
            v-model="formSearch.date"
            type="daterange"
            range-separator="-"
            start-placeholder="进厂开始日期"
            end-placeholder="进厂结束日期"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="formSearch.branchId" filterable :disabled="isshowBtn!=='0'" placeholder="请选择网点机构" @change="changeBranch">
            <el-option
              v-for="item in branchList"
              :key="item.id"
              :label="item.branchName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            v-has="'distribute:query'"
            type="primary"
            icon="el-icon-search"
            @click="submitForm('formSearch')"
          >查询</el-button>
          <el-button
            type="primary"
            plain
            icon="el-icon-refresh"
            @click="resetForm('formSearch')"
          >重置</el-button>
        </el-form-item>
      </el-form>
      <div class="line-s" />
    </div>
    <!-- 列表操作 -->
    <div ref="action" class="action-wrap">
      <div>
        <el-button
          v-has="'distribute:dispatch'"
          type="primary"
          @click="uploadFun"
        >调度</el-button>
      </div>
      <div>
        <el-button
          v-has="'distribute:export'"
          type="primary"
          icon="el-icon-upload2"
          @click="exportFiles"
        >导出</el-button>
      </div>
    </div>
    <TableWrap>
      <el-table
        height="100%"
        :data="tableData"
        tooltip-effect="dark"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column :selectable="selectable" type="selection" width="55" />
        <el-table-column prop="routeName" label="路由名称" width="260" />
        <el-table-column
          prop="preDistributeNum"
          label="预配载数(只)"
          width="180"
        />
        <el-table-column
          prop="distributeNum"
          label="实际配载数(只)"
          width="180"
        />
        <el-table-column prop="statusStr" width="180" label="调度状态">
          <template slot-scope="scope">
            <p
              :class="
                scope.row.status === 1
                  ? 'root-status-f'
                  : scope.row.status === 2
                    ? 'root-status-b'
                    : 'root-status-s'
              "
            >
              <span />{{ scope.row.statusStr }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="branchName"
          label="所属网点"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="arrivalTime" label="进厂时间" />
        <el-table-column prop="order" label="操作" fixed="right" width="220">
          <template slot-scope="scope">
            <span
              v-has="'distribute:detail'"
              class="ac-text"
              @click="getDetails(scope.row, 0)"
            >详情</span>
            <span
              v-if="scope.row.status !== 1"
              v-has="'distribute:edit'"
              class="ac-text"
              @click="getDetails(scope.row, 1)"
            >编辑</span>
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

    <!-- 新增 -->
    <el-dialog
      v-if="dialogFormVisible"
      title="调度"
      destroy-on-close
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="900px"
      @close="handleClose"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in originTabData"
          :key="item.routeName"
          :label="item.routeName"
          :name="item.routeName"
        >
          <p class="l14">路由信息</p>
          <div class="router-info">
            <p>
              <span>路由名称：</span>
              <span>{{ tabData.routeName }}</span>
            </p>
            <p>
              <span>预配载数（只）：</span>
              <span>{{ tabData.dispatchRouteInfoDTO.preDistributeNum }}</span>
            </p>
          </div>
          <el-table
            :ref="'multipleTable' + index"
            :data="tabData.dispatchRouteInfoDTO.routeMerchantInfo"
            tooltip-effect="dark"
            border
            style="width: 100%"
            center
            size="mini"
            max-height="200px"
            @selection-change="selectBusiness"
          >
            <el-table-column
              type="selection"
              width="55"
              :selectable="selectableBusiness"
            />
            <el-table-column prop="code" label="商户代号" width="120" />
            <el-table-column prop="name" label="商户名称" width="120" />
            <el-table-column prop="num" label="商户编号" width="180" />
            <el-table-column prop="address" label="商户地址" />
            <el-table-column
              prop="toDistributeNum"
              label="待配送数量（只）"
              width="180"
            />
            <!-- <el-table-column
              prop="order"
              label="操作"
            >
              <template slot-scope="scope">
                <span class="ac-text" @click="getDetails">详情</span>
                <span class="ac-text" @click="eidtItem">编辑</span>
              </template>
            </el-table-column> -->
          </el-table>
          <div class="btn-wrap">
            <el-button
              size="mini"
              type="primary"
              @click="collectFun"
            >拼载</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="delAllocateList"
            >反拼</el-button>
          </div>
          <p class="l14">配载数</p>
          <el-table
            :data="allocateList"
            tooltip-effect="dark"
            border
            style="width: 100%"
            center
            size="mini"
            max-height="200px"
            @selection-change="delAllocateListChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="code" label="商户代号" width="120" />
            <el-table-column prop="name" label="商户名称" width="120" />
            <el-table-column prop="num" label="商户编号" width="180" />
            <el-table-column prop="address" label="商户地址" />
            <el-table-column prop="toDistributeNum" label="载配数量（只）">
              <template slot-scope="scope">
                <el-input-number
                  v-model.number="scope.row.toDistributeNum"
                  size="mini"
                  :min="0.5"
                  :step="0.5"
                  :step-strictly="true"
                  :max="Number(scope.row.max)"
                  @change="numChange($event, scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
          <div class="btn-wrap">
            <el-button
              size="mini"
              type="primary"
              @click="
                dialogFormVisible = false
                handleClose()
              "
            >取消</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="setCarInfoPing('formPing')"
            >拼车</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="setCarInfo"
            >配载</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!-- 添加配载司机 -->
    <el-dialog
      title="选择司机与车辆"
      destroy-on-close
      :close-on-click-modal="false"
      :visible.sync="carFormVisible"
      width="600px"
    >
      <el-form
        ref="formUp"
        :model="formUp"
        :rules="formRule"
        style="margin-top:20px"
      >
        <el-form-item
          label="配送司机："
          :label-width="formLabelWidth"
          prop="carName"
        >
          <el-select
            v-model="formUp.carName"
            filterable
            placeholder="请选择配送司机"
            @change="setTel"
          >
            <el-option
              v-for="(item, index) in driverList"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式：" :label-width="formLabelWidth">
          <input
            v-model="formUp.carTel"
            disabled
            style="width:217px;background:#fff;border:none;color:#606266"
          >
        </el-form-item>
        <el-form-item
          label="配送车辆："
          :label-width="formLabelWidth"
          prop="carNum"
        >
          <el-select
            v-model="formUp.carNum"
            filterable
            placeholder="请选择配送车辆"
            @change="setSurplusCapacity"
          >
            <el-option
              v-for="(item, index) in carList"
              :key="index"
              :label="item.vehicleNumber"
              :value="item.vehicleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <p>
            剩余装载数(只) ：<span style="color:#409EFF">{{
              formUp.surplusCapacity
            }}</span>
          </p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="carFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('formUp')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加拼车司机 -->
    <el-dialog
      title="选择司机与车辆"
      destroy-on-close
      :close-on-click-modal="false"
      :visible.sync="carFormVisiblePing"
      width="600px"
    >
      <el-form
        ref="formPing"
        :model="formPing"
        :rules="formPingRules"
        style="margin-top:20px"
      >
        <el-form-item
          label="配送车辆："
          :label-width="formLabelWidth"
          prop="carNumShow"
        >
          <el-select
            v-model="formPing.carNumShow"
            filterable
            placeholder="请选择配送车辆"
            @change="getCarNum"
          >
            <el-option
              v-for="(item, index) in PlateListOptions"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="配送单号："
          :label-width="formLabelWidth"
          prop="carOrder"
        >
          <el-select
            v-model="formPing.carOrder"
            filterable
            placeholder="请选择配送单号"
            @change="getCarOrderNum"
          >
            <el-option
              v-for="(item, index) in carOrderListOptions"
              :key="index"
              :label="item.orderNumber"
              :value="item.orderNumber"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="配送司机：" :label-width="formLabelWidth">
          <input
            v-model="formPing.carNameShow"
            disabled
            style="width:217px;background:#fff;border:none;color:#606266"
          >
        </el-form-item>
        <el-form-item label="联系方式：" :label-width="formLabelWidth">
          <input
            v-model="formPing.carTel"
            disabled
            style="width:217px;background:#fff;border:none;color:#606266"
          >
        </el-form-item>
        <el-form-item label="剩余装载数(只)：" :label-width="formLabelWidth">
          <span style="color:#409EFF">{{ formPing.surplusCapacity }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="carFormVisiblePing = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submit('formPing', 1)"
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 详情和编辑 -->
    <el-dialog
      v-if="eidtFormVisible"
      :title="isEidt ? '编辑' : '详情'"
      destroy-on-close
      :close-on-click-modal="false"
      :visible.sync="eidtFormVisible"
      width="900px"
    >
      <div class="detailinfo-wrap">
        <p class="l14">路由信息</p>
        <div class="router-info">
          <p>
            <span>路由名称：</span>
            <span>{{ tabData.routeName }}</span>
          </p>
          <p>
            <span>预配载数（只）：</span>
            <span>{{
              tabData.dispatchRouteInfoDTO &&
                tabData.dispatchRouteInfoDTO.preDistributeNum
            }}</span>
          </p>
          <p>
            <span>实际配载数（只）：</span>
            <span>{{ distributeNum }}</span>
          </p>
        </div>
        <el-table
          :data="
            tabData.dispatchRouteInfoDTO
              ? tabData.dispatchRouteInfoDTO.routeMerchantInfo
              : []
          "
          tooltip-effect="dark"
          border
          style="width: 100%"
          center
          size="mini"
          max-height="200px"
        >
          <el-table-column prop="code" label="商户代号" width="120" />
          <el-table-column prop="name" label="商户名称" width="120" />
          <el-table-column prop="num" label="商户编号" width="180" />
          <el-table-column prop="address" label="商户地址" />
          <el-table-column
            prop="distributeNum"
            label="配载数量（只）"
            width="180"
          />
        </el-table>
        <el-tabs v-model="eidtActiveName" @tab-click="handleDetailClick">
          <el-tab-pane label="配载信息" name="0">
            <div v-if="!tabData.stowageInfoDTO">暂无数据</div>
            <div
              v-for="(item, index) in tabData.stowageInfoDTO"
              :key="index"
              class="mrb26"
            >
              <el-row type="flex" class="row-bg">
                <el-form
                  :ref="'formCarUp' + index"
                  :class="[!isEidt ? 'disabled-from' : '']"
                  :disabled="!isEidt"
                  :model="item.carInfo"
                  size="mini"
                >
                  <el-col :span="8">
                    <el-form-item
                      style="margin-bottom:10px;"
                      label="配送司机："
                      label-width="100px"
                    >
                      <el-select
                        v-model="item.driverId"
                        filterable
                        placeholder="请选择配送司机"
                        @change="setInfoDTO($event, index)"
                      >
                        <el-option
                          v-for="(v, i) in driverList"
                          :key="i"
                          :label="v.name"
                          :value="v.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      style="margin-bottom:10px;"
                      label="联系方式："
                      :label-width="carformLabelWidth"
                    >
                      <el-input
                        v-model="item.driverTel"
                        disabled
                        :style="styleObj"
                        placeholder="请输入车牌号码"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      style="margin-bottom:15px;"
                      label="配送车辆："
                      :label-width="carformLabelWidth"
                    >
                      <el-select
                        v-model="item.vehicleId"
                        filterable
                        placeholder="请选择配送车辆"
                        @change="
                          setInfoDTONum(
                            $event,
                            index,
                            item.orderNumberStowageNum
                          )
                        "
                      >
                        <el-option
                          v-for="(v, i) in PZCarList.filter(
                            v => v.surplusCapacity >= item.stowageNum
                          )"
                          :key="i"
                          :label="v.vehicleNumber"
                          :value="v.vehicleId"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" class="disabled-from">
                    <el-form-item
                      style="margin-bottom:15px;"
                      label="配送单号："
                      label-width="100px"
                    >
                      <el-input v-model="item.orderNumber" disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" class="disabled-from">
                    <el-form-item
                      style="margin-bottom:15px;"
                      label="配载数量（只)："
                      :label-width="carformLabelWidth"
                    >
                      <el-input
                        v-model="item.stowageNum"
                        disabled
                        :style="styleObj"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" class="disabled-from">
                    <el-form-item
                      style="margin-bottom:15px;"
                      label="剩余装载数（只)："
                      :label-width="carformLabelWidth"
                    >
                      <el-input
                        v-model="item.surplusStowageNum"
                        disabled
                        :style="styleObj"
                      />
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
              <el-table
                :data="item.planDetail"
                tooltip-effect="dark"
                border
                style="width: 100%"
                center
                size="mini"
              >
                <el-table-column
                  prop="merchantCode"
                  label="商户代号"
                  width="120"
                />
                <el-table-column
                  prop="merchantName"
                  label="商户名称"
                  width="120"
                />
                <el-table-column
                  prop="merchantNum"
                  label="商户编号"
                  width="180"
                />
                <el-table-column prop="merchantAddress" label="商户地址" />
                <el-table-column prop="distributeNum" label="载配数量（只）" />
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="拼车信息" name="1">
            <div v-if="!tabData.shareStowageInfoDTO">暂无数据</div>
            <div
              v-for="(item, index) in tabData.shareStowageInfoDTO"
              :key="index"
              class="mrb26"
            >
              <el-row type="flex" class="row-bg">
                <el-form
                  :ref="'formCarUp' + index"
                  :class="[!isEidt ? 'disabled-from' : '']"
                  :disabled="!isEidt"
                  :model="item.carInfo"
                  size="mini"
                >
                  <el-col :span="8">
                    <el-form-item
                      style="margin-bottom:10px;"
                      label="配送单号："
                      label-width="100px"
                    >
                      <el-select
                        v-model="item.orderNumber"
                        filterable
                        placeholder="请选择配送车辆"
                        @change="shareStowageInfoDTO($event, index)"
                      >
                        <el-option
                          v-for="(v, i) in orderNumberList.filter(
                            v => v.surplusCapacity >= item.stowageNum
                          )"
                          :key="i"
                          :label="v.orderNumber"
                          :value="v.orderNumber"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      style="margin-bottom:10px;"
                      label="联系方式："
                      :label-width="carformLabelWidth"
                    >
                      <el-input
                        v-model="item.driverTel"
                        disabled
                        :style="styleObj"
                        placeholder="请输入车牌号码"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item
                      style="margin-bottom:15px;"
                      label="配送车辆："
                      :label-width="carformLabelWidth"
                    >
                      <el-select
                        v-model="item.vehicleId"
                        disabled
                        placeholder="请选择配送车辆"
                      >
                        <el-option
                          v-for="(v, i) in PZCarList"
                          :key="i"
                          :label="v.vehicleNumber"
                          :value="v.vehicleId"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" class="disabled-from">
                    <el-form-item
                      style="margin-bottom:10px;"
                      label="配送司机："
                      label-width="100px"
                    >
                      <el-select v-model="item.driverId" disabled>
                        <el-option
                          v-for="(v, i) in driverList"
                          :key="i"
                          :label="v.name"
                          :value="v.id"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" class="disabled-from">
                    <el-form-item
                      style="margin-bottom:15px;"
                      label="配载数量（只):"
                      :label-width="carformLabelWidth"
                    >
                      <el-input
                        v-model="item.stowageNum"
                        disabled
                        :style="styleObj"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" class="disabled-from">
                    <el-form-item
                      style="margin-bottom:15px;"
                      label="剩余装载数（只)："
                      :label-width="carformLabelWidth"
                    >
                      <el-input
                        v-model="item.surplusStowageNum"
                        disabled
                        :style="styleObj"
                      />
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
              <el-table
                :data="item.planDetail"
                tooltip-effect="dark"
                border
                style="width: 100%"
                center
                size="mini"
              >
                <el-table-column
                  prop="merchantCode"
                  label="商户代号"
                  width="120"
                />
                <el-table-column
                  prop="merchantName"
                  label="商户名称"
                  width="120"
                />
                <el-table-column
                  prop="merchantNum"
                  label="商户编号"
                  width="180"
                />
                <el-table-column prop="merchantAddress" label="商户地址" />
                <el-table-column prop="distributeNum" label="载配数量（只）" />
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-show="detailTabactive === '0' && isEidt"
          size="mini"
          type="primary"
          @click="eidtFormVisible = false"
        >取消</el-button>
        <el-button size="mini" type="primary" @click="resetCarInfo">{{
          detailTabactive === '1' || !isEidt ? '关闭' : '确定'
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DistributionAPI from '@/api/distribution.js'
import Pagination from '@/components/pagination'
import TableWrap from '@/components/TableWrap'
import _ from 'lodash'
import { branchDropDown } from '@/utils/mixin'
export default {
  components: {
    Pagination,
    TableWrap
  },
  mixins: [branchDropDown],
  data() {
    return {
      styleObj: {
        border: 'none',
        color: '#000'
      },
      activeName: '',
      eidtActiveName: '0',
      fullscreenLoading: false,
      eidtFormVisible: false,
      isEidt: false,
      carformLabelWidth: '140px',
      multipleSelection: '',
      selectBusinessList: [], // 商户集合
      allocateList: [], // 配载集合
      defaultList: [], // 被操作的商户集合
      hasSelectList: [], // 需要处理的配载项
      detailsData: {
        // 详情数据
        baseRouter: {},
        list: []
      },
      // 配载
      formUp: {
        carName: '',
        carTel: '--',
        carNum: ''
      },
      isSureP: false,
      // 拼车
      formPing: {
        carName: '',
        carTel: '--',
        carNum: '',
        carOrder: '',
        carNameShow: ''
      },
      dialogFormVisible: false,
      carFormVisible: false,
      carFormVisiblePing: false,
      formLabelWidth: '200px',
      formRule: {
        carName: [
          { required: true, message: '请选择配送司机', trigger: 'change' }
        ],
        carTel: [
          { required: true, message: '请输入手机号码', trigger: 'change' }
        ],
        carNum: [
          {
            required: true,
            message: '请选择配送车辆',
            trigger: 'change'
          }
        ],
        driverId: [
          { required: true, message: '请选择配送司机', trigger: 'change' }
        ],
        vehicleId: [
          {
            required: true,
            message: '请选择配送车辆',
            trigger: 'change'
          }
        ]
      },
      formPingRules: {
        carName: [
          { required: true, message: '请选择配送司机', trigger: 'change' }
        ],
        carTel: [
          { required: true, message: '请输入手机号码', trigger: 'change' }
        ],
        carNumShow: [
          {
            required: true,
            message: '请选择配送车辆',
            trigger: 'change'
          }
        ],
        carOrder: [
          {
            required: true,
            message: '请选择配送单号',
            trigger: 'change'
          }
        ]
      },
      total: 0,
      formSearch: {
        distributionOrderCode: '',
        routeName: '',
        status: '',
        date: ''
      },
      listLoading: false,
      TableHeight: '300px',
      listQuery: {
        page: 1,
        limit: 10
      },
      tableData: [],
      originTabData: [], // 原始的tab数据
      activeIndex: 0, // 原始的tab 激活index
      tabData: [], // 调度数据
      carList: [], // 车辆数据
      driverList: [], // 司机数据
      carOrderListOptions: [], // 配送单号的数据
      PZCarList: [], // 配载全部车辆
      distributionOrderId: '', // 打开弹窗需要保存当前的调度单号
      detailTabactive: '0', // 打开弹窗需编辑时需要tab 激活index
      orderNumberList: [],
      distributeNum: '',
      allList: {},
      PlateListOptions: []
    }
  },
  computed: {},
  mounted() {
    this.getList()
    this.getDriverList()
    this.getPZCarList()
  },

  methods: {
    // 获取配载司机列表
    getDriverList() {
      DistributionAPI.PostDriver().then(res => {
        this.driverList = res.result
      })
    },
    // exportFiles() {
    //   const postData = {
    //     arrivalTimeEnd: this.formSearch.date[1],
    //     arrivalTimeStart: this.formSearch.date[0],
    //     distributionOrderCode: this.formSearch.distributionOrderCode,
    //     routeName: this.formSearch.routeName,
    //     status: this.formSearch.status
    //   }
    //   const params = Object.keys(postData).reduce((pre, v) => {
    //     return pre === ''
    //       ? pre + v + `=${postData[v] || ''}`
    //       : pre + '&' + v + `=${postData[v] || ''}`
    //   }, '')
    //   window.location.href = DistributionAPI.gettExportDispatchOrder(params)
    // },
    exportFiles: _.debounce(function() {
      const postData = {
        arrivalTimeEnd: this.formSearch.date[1],
        arrivalTimeStart: this.formSearch.date[0],
        distributionOrderCode: this.formSearch.distributionOrderCode,
        routeName: this.formSearch.routeName,
        status: this.formSearch.status,
        branchId: this.formSearch.branchId
      }
      const params = Object.keys(postData).reduce((pre, v) => {
        return pre === ''
          ? pre + v + `=${postData[v] || ''}`
          : pre + '&' + v + `=${postData[v] || ''}`
      }, '')
      window.location.href = DistributionAPI.gettExportDispatchOrder(params)
    }, 500),
    getCarNum($event) {
      this.formPing.carOrder = ''
      this.carOrderListOptions = this.allList[$event]
    },
    // 获取配送单号对应的配载余量
    getCarOrderNum($event) {
      const item = this.carOrderListOptions.filter(
        v => v.orderNumber === $event
      )[0]
      this.formPing.carNameShow = item.driverName
      this.formPing.carName = item.driverId
      this.formPing.carTel = item.driverTel
      this.formPing.carNum = item.vehicleId
      this.formPing.carNumShow = item.vehicleNumber
      this.formPing.surplusCapacity = item.surplusCapacity
    },
    // 编辑切换司机变更手机号
    setInfoDTO($event, index) {
      const data = this.driverList.filter(v => v.id === $event)[0]
      this.tabData.stowageInfoDTO[index].driverTel = data.tel
    },
    // 编辑切换配送单号变更配送信息
    shareStowageInfoDTO($event, index) {
      console.log(this.orderNumberList)
      const item = this.orderNumberList.filter(v => v.orderNumber === $event)[0]
      const data = this.tabData.shareStowageInfoDTO[index]
      data.driverTel = item.driverTel
      data.vehicleId = item.vehicleId
      data.driverId = item.driverId
      data.surplusStowageNum = item.surplusStowageNum

      this.$forceUpdate()
      this.saveShareData()
    },
    // 编辑切换车辆显示剩余配载数
    setInfoDTONum($event, index, total) {
      this.getPZCarList().then(() => {
        const data = this.PZCarList.filter(v => v.vehicleId === $event)[0]
        this.tabData.stowageInfoDTO[index].surplusStowageNum =
          data.surplusCapacity - total

        this.$forceUpdate()
      })
    },
    // 变化数值的处理
    numChange(v, item) {
      console.log(v, item)
      // v  当前值  item 当前数据
      const listAry = this.defaultList.dispatchRouteInfoDTO.routeMerchantInfo
      const obj = listAry.filter(v => item.id === v.id)[0]
      setTimeout(() => {
        obj.toDistributeNum = Number(item.max - item.toDistributeNum)
      }, 5)
    },
    // 编辑修改司机
    resetCarInfo() {
      if (this.validateForm()) {
        if (this.detailTabactive === '1' || !this.isEidt) {
          // 拼车保存
          this.eidtFormVisible = false
        } else {
          if (
            this.tabData.stowageInfoDTO == null ||
            this.tabData.stowageInfoDTO == []
          ) {
            this.eidtFormVisible = false
            this.$message.success('操作成功')
          } else {
            // 配载保存
            const plans = this.tabData.stowageInfoDTO.map(v => {
              return {
                distributionOrderPlanId: v.distributionOrderPlanId,
                driverId: v.driverId,
                vehicleId: v.vehicleId
              }
            })
            const postData = {
              distributionOrderId: this.distributionOrderId,
              plans
            }
            const loading = this.$loading({
              lock: true,
              background: 'rgba(255,255,255,0.1)'
            })

            DistributionAPI.PostEditDistributionOrder(postData).then(res => {
              loading.close()
              this.eidtFormVisible = false
              if (res.code === 200) {
                this.$message.success(res.message)
              } else {
                this.$messag.error(res.message)
              }
            })
          }
        }
      }
    },
    validateForm() {
      const formList = []
      this.detailsData.list.forEach((v, i) =>
        formList.push(this.$refs['formCarUp' + i])
      )
      return formList.reduce((prev, form) => {
        if (form) {
          form[0].validate(valid => {
            if (!valid) {
              prev = false
            }
          })
          return prev
        }
      }, true)
    },
    // 配载司机
    setCarInfo() {
      if (!this.allocateList.length) {
        this.$message.warning('请选择需要配载的商户数据！')
        return false
      }
      this.formUp = {
        carName: '',
        carTel: '请选择配送司机',
        carNum: '',
        surplusCapacity: '--'
      }
      const total = this.allocateList.reduce(
        (pre, v, ary) => pre + v.toDistributeNum,
        0
      )
      DistributionAPI.PostDispatchVehicleDropDown(0).then(res => {
        this.carList = res.result.filter(v => v.surplusCapacity >= total)
      })

      this.carFormVisible = true
    },
    // 拼车司机
    setCarInfoPing(formName) {
      if (!this.allocateList.length) {
        this.$message.warning('请选择需要拼车的商户数据！')
        return false
      }
      this.formPing = {
        carName: '--',
        carTel: '--',
        carNum: '',
        carOrder: '',
        carNameShow: '--',
        carNumShow: '',
        surplusCapacity: '--'
      }
      this.carOrderListOptions = []
      const total = this.allocateList.reduce(
        (pre, v, ary) => pre + v.toDistributeNum,
        0
      )
      this.$refs[formName] && this.$refs[formName].resetFields()

      const id = this.originTabData[this.activeIndex].distributionOrderId
      DistributionAPI.PostDispatchedOrderNumber(id).then(res => {
        console.log(res.result)
        this.PlateListOptions = Object.keys(res.result)
        this.allList = res.result
        // this.carOrderListOptions = res.result.filter(
        //   v => v.surplusCapacity >= total
        // )
      })

      this.carFormVisiblePing = true
    },
    // 动态电话
    setTel($event) {
      this.formUp.carTel = this.driverList.filter(v => v.id === $event)[0].tel
    },
    // 动态配载剩余量
    setSurplusCapacity($event) {
      this.formUp.surplusCapacity = this.carList.filter(
        v => v.vehicleId === $event
      )[0].surplusCapacity
    },
    getCarList(total) {
      // const total = list.reduce((pre, v, ary) => (pre + v.distributeNum), 0)
      if (this.detailTabactive === '0') {
        return this.PZCarList.filter(v => v.surplusCapacity >= total)
      } else {
        DistributionAPI.PostDispatchedOrderNumber(
          this.distributionOrderId
        ).then(res => {
          console.log(res, 'xxx')
          this.orderNumberList = []
          if (Object.keys(res.result).length > 0) {
            Object.values(res.result).forEach(v => {
              this.orderNumberList.push(...v)
            })
            console.log(this.orderNumberList)
          }
        })
      }
    },
    // 获取拼载车辆列表
    async getPZCarList() {
      const res = await DistributionAPI.PostDispatchVehicleDropDown(0)
      this.PZCarList = res.result
    },

    // 删除配载 反拼
    delAllocateList() {
      if (!this.hasSelectList.length) {
        this.$message.warning('请选择需要反拼的商户数据！')
        return false
      }
      this.hasSelectList.forEach(item => {
        // 删除
        const i = this.allocateList.findIndex(v => v.id === item.id)
        this.allocateList.splice(i, 1)

        // 值回显到路由列表
        const listAry = this.defaultList.dispatchRouteInfoDTO.routeMerchantInfo
        const bi = listAry.findIndex(v => v.id === item.id)
        listAry[bi].toDistributeNum += item.toDistributeNum
      })
    },
    // 选择需要处理的配载数
    delAllocateListChange(val) {
      this.hasSelectList = val
    },
    // 拼载
    collectFun() {
      // if (this.allocateList.length) {
      //   this.$message.warning('请完成本次配载之后，再进行拼载！')
      //   return false
      // }
      if (!this.selectBusinessList.length) {
        this.$message.warning('请选择需要拼载的商户数据！')
        return false
      }

      JSON.parse(JSON.stringify(this.selectBusinessList)).forEach(v => {
        const ary = this.allocateList.filter(item => item.id === v.id)
        if (ary.length) {
          ary[0].toDistributeNum += v.toDistributeNum
        } else {
          v.max = v.toDistributeNum
          this.allocateList.push(v)
        }
      })
      this.allocateList.forEach(item => {
        this.numChange(item.toDistributeNum, item)
      })

      this.$nextTick(() => {
        this.$refs['multipleTable' + this.activeIndex] &&
          this.$refs['multipleTable' + this.activeIndex][0].clearSelection()
      })
    },
    // 选择商户
    handleClick(data) {
      this.activeIndex = data.index
      const id = this.originTabData[data.index].distributionOrderId
      this.getTabData(id)
    },
    // 切换详情/编辑 tab
    async handleDetailClick(data) {
      this.detailTabactive = data.index

      await this.getCarList()
      await this.getTabData(this.distributionOrderId)
    },
    getTabData(id) {
      DistributionAPI.PostDispatchWindow({ distributionOrderIds: [id] }).then(
        res => {
          this.tabData = res.result[0]
          this.defaultList = this.tabData
          this.allocateList = []
        }
      )
    },
    // 是否可以多选处理
    selectable(row, index) {
      if (row.status !== 3) {
        return true
      } else {
        return false
      }
    },
    handleClose() {
      this.getList()
    },
    // 调度  弹窗是否可以对待配送为0进行多选处理
    selectableBusiness(row) {
      if (row.toDistributeNum !== 0) {
        return true
      } else {
        return false
      }
    },
    // 配载
    submit(formName, isShare = 0) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            background: 'rgba(255,255,255,0.1)'
          })
          const postData = {
            distributionOrderId: this.defaultList.distributionOrderId, // 调度单id
            driverId: this[formName].carName, // 司机id
            isShare, // 是否拼车
            orderNumber: isShare === 1 ? this[formName].carOrder : '', // 配送单号
            vehicleId: this[formName].carNum, // 车辆id
            dispatchMerchants: this.allocateList.map(v => {
              return {
                merchantId: v.id,
                dispatchNum: v.toDistributeNum
              }
            })
          }
          DistributionAPI.PostDispatch(postData).then(res => {
            if (res.code === 200) {
              this.$message.success('配载成功')
              loading.close()
              this.handleClick({ index: this.activeIndex })
            } else {
              this.$message.error(res.message)
            }
          })

          this.carFormVisible = false
          this.carFormVisiblePing = false
          this.allocateList = []
          this.$refs[formName].resetFields()
        } else {
          return false
        }
      })
    },
    reset() {
      this.formUp = {
        name: '',
        type: '',
        orderId: '',
        fileUrl: ''
      }
    },
    // 配调按钮
    uploadFun() {
      if (!this.multipleSelection.length) {
        this.$message.warning('请选择数据！')
        return false
      }
      this.defaultList = []
      this.allocateList = []
      const ids = this.multipleSelection.map(v => v.id)
      DistributionAPI.PostDispatchWindow({ distributionOrderIds: ids }).then(
        res => {
          this.originTabData = res.result
          this.tabData = res.result[0]
          this.activeName = this.tabData.routeName
          this.defaultList = this.tabData
          this.reset()
          this.dialogFormVisible = true
        }
      )
    },
    // 选择调度商户
    selectBusiness(val) {
      this.selectBusinessList = val
    },
    submitForm() {
      const postData = {
        branchId: this.formSearch.branchId,
        arrivalTimeEnd: this.formSearch.date[1],
        arrivalTimeStart: this.formSearch.date[0],
        distributionOrderCode: this.formSearch.distributionOrderCode,
        pageNum: 1,
        pageSize: 10,
        routeName: this.formSearch.routeName,
        status: this.formSearch.status
      }
      DistributionAPI.PostqueryDistributionOrderByRequest(postData).then(
        res => {
          this.tableData = res.result.list
          this.total = res.result.total
          this.listQuery = {
            page: 1,
            limit: 10
          }
        }
      )
    },
    resetForm(formName) {
      for (const key in this.formSearch) {
        this.formSearch[key] = ''
      }
      this.formSearch.branchId = localStorage.getItem('userTypeSW') === '0' ? '' : localStorage.getItem('nowbranchDropDown')
      this.$refs[formName] && this.$refs[formName].resetFields()
      this.submitForm()
    },
    getList() {
      const postData = {
        branchId: this.formSearch.branchId,
        arrivalTimeEnd: this.formSearch.date[1],
        arrivalTimeStart: this.formSearch.date[0],
        distributionOrderCode: this.formSearch.distributionOrderCode,
        pageNum: this.listQuery.page,
        pageSize: this.listQuery.limit,
        routeName: this.formSearch.routeName,
        status: this.formSearch.status
      }
      DistributionAPI.PostqueryDistributionOrderByRequest(postData).then(
        res => {
          this.tableData = res.result.list
          this.total = res.result.total
        }
      )
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getDetails(item, flag) {
      console.log(item)
      this.orderNumberList = []
      this.distributionOrderId = item.id
      this.getTabData(item.id)
      this.distributeNum = item.distributeNum
      this.eidtFormVisible = true
      this.eidtActiveName = '0'
      this.isEidt = flag
      this.detailTabactive = '0'
    },
    saveShareData() {
      const sharePlans = this.tabData.shareStowageInfoDTO.map(v => {
        return {
          distributionOrderPlanId: v.distributionOrderPlanId,
          orderNumber: v.orderNumber
        }
      })
      const postData = {
        distributionOrderId: this.distributionOrderId,
        sharePlans
      }
      DistributionAPI.PostEditShareDistributionOrder(postData).then(res => {
        this.getTabData(this.distributionOrderId)
        if (res.code === 200) {
          this.$message.success(res.message)
        } else {
          this.$messag.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detailinfo-wrap {
  max-height: 500px;
  width: 100%;
  overflow-y: auto;
}
.router-info {
  display: flex;
  margin: 8px 0;
  p {
    margin-right: 20px;
    padding-left: 10px;
    color: $bc;
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
.disabled {
  input {
    width: 217px;
    background: #fff;
    border: none;
    color: #ddd;
  }
}
</style>
